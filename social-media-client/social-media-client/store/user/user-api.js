import BaseApi from '@/utils/base-api'
import store from '../index'
import userSlice from './user-slice'
import {errSelector, tokenSelector, userIdSelector, usernameSelector} from './user-selectors'

class UserApi extends BaseApi {

    constructor() {
        super()
    }

    async register(registrationData) {
        try {
            const response = await this.makeApiRequest('auth/register', 'POST', registrationData) 
            if (response.status === 201) {
                store.dispatch(userSlice.actions.registerSuccess)
            }
        } catch (e) {
            if (e.response) {
                store.dispatch(userSlice.actions.loginFailure({
                    errMessage: e.response.data.message
                }))
            }
        }
    }

    async login(email, password) {
        try {
            const response = await this.makeApiRequest('auth/login', 'POST', {
                email,
                password
            })
            if (response.status === 200) {
                store.dispatch(userSlice.actions.loginSuccess({
                    userId: response.data.id,
                    username: response.data.username,
                    token: response.data.accessToken
                }))
                localStorage.setItem('accessToken', response.data.accessToken)
            }
        } catch (e) {
            if (e.response) {
                store.dispatch(userSlice.actions.loginFailure({
                    errMessage: e.response.data.message
                }))
            }
            throw e
        }
    }

    async logout() {
        try {
            const response = await this.makeApiRequest('auth/logout', 'POST', null, {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            })
            if (response.status === 200) {
                localStorage.removeItem('accessToken')
            }
        } catch (e) {
            if (e.response) {
                return 'something went wrong'
            }
        }
    }

    async getUser(token) {
        try {
            const response = await this.makeApiRequest('auth/get-user', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            if (response.status === 200) {
                localStorage.setItem('userId', response.data._id)
                if (!this.getUsername()) {
                    store.dispatch(userSlice.actions.loginSuccess({
                        userId: response.data._id,
                        username: response.data.username,
                        token: localStorage.getItem('accessToken')
                    }))
                }
            }
        } catch(e) {
            console.log(e)
            if (e.response && e.response.status === 401) {
                throw e
            } else {
                // will be taken care of
            }
        }
    }

    getUsername(state) {
        return usernameSelector(state)
    }

    getError(state) {
        return errSelector(state)
    }

    getUserId(state) {
        return userIdSelector(state)
    } 

    getToken(state) {
        return tokenSelector(state)
    }
    
}

const userApi = new UserApi()

export default userApi