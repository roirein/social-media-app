import BaseApi from '@/utils/base-api'
import store from '../index'
import userSlice from './user-slice'

class UserApi extends BaseApi {

    constructor() {
        super()
    }

    async login(email, password) {
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

        return response.data.id
    }
}

const userApi = new UserApi()

export default userApi