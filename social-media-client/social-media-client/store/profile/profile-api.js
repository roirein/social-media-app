import BaseApi from "@/utils/base-api";
import { tokenSelector } from "../user/user-selectors";
import store from '../index'
import profileSlice from "./profile-slice";
import { coverImageSelector, profileImageSelector } from "./profile-selectors";
import userApi from "../user/user-api";

class ProfileApi extends BaseApi {
    constructor() {
        super()
    }

    async uploadImage(imageType, data) {
        try {
            const response = await this.makeApiRequest(`profile/image/${imageType}`, 'PATCH', data, {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            if (response.status === 200) {
                store.dispatch(profileSlice.actions.uploadCoverSuccess({imageUrl: response.data.imageUrl}))
            }
            return response.data.imageUrl
        } catch (e) {
            console.log(e)
        }
    }

    async getProfile(url) {
        try {
            console.log(url)
            const response = await this.makeApiRequest(url, 'GET', null, {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    // async retriveProfile(userId) {
    //     if (userId === userApi.getUserId()) { peformance improvement for later

    //     }
    // }

    getImage(state, imageType) {
        return imageType === 'profile' ? profileImageSelector(state) : coverImageSelector(state)
    }
    
}

const profileApi = new ProfileApi()

export default profileApi