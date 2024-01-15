import BaseApi from '@/utils/base-api'
import store from '../index'
import userSlice from './user-slice'
import {errSelector, usernameSelector} from './user-selectors'

class UserApi extends BaseApi {

    constructor() {
        super()
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

    async getUser(token) {
        try {
            const response = await this.makeApiRequest('auth/get-user', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            if (response.status === 200) {
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
    
}

const userApi = new UserApi()

export default userApi