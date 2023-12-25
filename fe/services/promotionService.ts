import { http } from '../utils/axios';

class PromotionService {
    async createPromotion(data: any, config?: any) {
        return await http.post<any>('/promotion/create_promotion', data, config);
    }
    async getPromotionsOfOwn() {
        return await http.get<any>('/promotion/get_promotions_of_owner');
    }
    async updatePromotion(proId: string, data: any, config?: any) {
        return await http.patch<any>(`/promotion/update_promotion/${proId}`, data, config);
    }
    async deletePromotion(proId: string) {
        return await http.delete<any>(`/promotion/delete_promotion/${proId}`);
    }
    async getPromotionByStd(stdId: string) {
        return await http.get<any>(`/promotion/get_promotions_by_std?stdId=${stdId}`);
    }
}

export default new PromotionService();
