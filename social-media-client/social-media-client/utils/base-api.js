import axios from "axios"

class BaseApi {
    constructor() {
        this.url = process.env.server_url
    }

    async makeApiRequest(requestPath, method, data = {}) {
        console.log(`${this.url}/${requestPath}`)
        try {
            const response = await axios({
                method,
                url: `${this.url}/${requestPath}`,
                data
            })
            return response
        } catch(e) {
            return e.response
        }
    }
}

export default BaseApi