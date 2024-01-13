import axios from "axios"

class BaseApi {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.server_url,
            withCredentials: true
        })
    }

    async makeApiRequest(requestPath, method, data = {}, headers = {}) {
        try {
            return await this.sendRequest(method, requestPath, headers, data)
        } catch(e) {
            if (e.response.status === 401) {
                if (e.response.data.message === 'token expired') {
                    const newTokenResponse = await this.getNewAccessToken()
                    if (newTokenResponse.status === 401) {
                        throw new Error('session ended')
                    }
                    localStorage.setItem('accessToken', newTokenResponse.data.accessToken)
                    return await this.sendRequest(method, requestPath, {...headers, Authorization: newTokenResponse.data.accessToken, data})
                } else {
                    throw e
                }
            }
            else {
                throw e
            }
        }
    }

    async sendRequest(method, requestPath, headers = {}, data = {}) {
        try {
            const response = await this.axiosInstance({
                url: requestPath,
                method,
                headers,
                data
            })
            return response
        } catch (e) {
            throw e
        }
    }

    async getNewAccessToken() {
        try {
            return await this.sendRequest('POST', '/auth/renew-token')
        } catch (e) {
            return e.response
        }
    }
}

export default BaseApi