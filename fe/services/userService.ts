import { http } from '../utils/axios';

class UserService {
    async changeUserInfo(data: any, config?: any) {
        return await http.patch('/user/update_user', data, config);
    }
    async getUserByPhone(phone: string) {
        return await http.get<any>(`/user/get_user_by_phone/${phone}`);
    }
    async findUserById(id: string) {
        return await http.get<any>(`/user/get_user_by_id`, {
            params: {
                id,
            },
        });
    }
}
export default new UserService();
