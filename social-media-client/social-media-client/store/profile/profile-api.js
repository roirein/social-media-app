import BaseApi from "@/utils/base-api";
import { tokenSelector } from "../user/user-selectors";
import store from '../index'
import profileSlice from "./profile-slice";
import { coverImageSelector } from "./profile-selectors";

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
        } catch (e) {
            console.log(e)
        }
    }

    getImage(state) {
        return coverImageSelector(state)
    }
}

const profileApi = new ProfileApi()

export default profileApi