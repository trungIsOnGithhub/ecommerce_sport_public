import { http } from '../utils/axios';

class profileService {
    async getMyProfile(){
        return await http.get<any>(`/profile/get_my_profile`);
    }

    async getProfileByUserId(id: string){
        return await http.get<any>(`/profile/get_profile_by_userid`, {params: {userId: id}});
    }

    async updateProfile(data: any){
        return await http.patch<any>(`/profile/update_profile`, data);
    }
}

export default new profileService();
