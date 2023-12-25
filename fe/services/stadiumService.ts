import { http } from '../utils/axios';
const NUMBER_OF_PAGES = 8;
interface StadiumSearch {
    name?: string;
    funds?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    sort?: any;
    page?: number;
}
class StadiumService {
    async searchStadiums(data: StadiumSearch) {
        if (
            data.name === '' &&
            data.funds === '0' &&
            data.provinceId === 0 &&
            data.districtId === 0 &&
            data.wardId === 0
        )
            return await http.get<StadiumSearch, any>('/stadium/search', {
                params: { name: '', provinceId: 0, districtId: 0, wardId: 0 },
            });
        else
            return await http.get<StadiumSearch, any>('/stadium/search', {
                params: {
                    name: data.name,
                    funds: data.funds === '0' ? undefined : data.funds,
                    provinceId: data.provinceId === 0 ? undefined : data.provinceId,
                    districtId: data.districtId === 0 ? undefined : data.districtId,
                    wardId: data.wardId === 0 ? undefined : data.wardId,
                    sort: data.sort ? data.sort : undefined,
                    page: data.page ? data.page : 1,
                    limit: NUMBER_OF_PAGES,
                },
            });
    }
    async getStadiumDetail(slug: string) {
        return await http.get<any>(`/stadium/${slug}`);
    }
    async getAllStadiumAreas(id: string) {
        return await http.get<any>(`/area/${id}/get_all_area_stadium`);
    }
    async getStadiumSchedule(id: string) {
        return await http.get<any>('/order/get_schedule_area', { params: { id: id } });
    }
    async getStadiumOfOwner() {
        return await http.get<any>('/stadium/owner');
    }
    async createStadium(data: any, config?: any) {
        return await http.post(`/stadium/create`, data, config);
    }
    async updateStadium(id: string, data: any, config?: any) {
        return await http.put(`/stadium/update/${id}`, data, config);
    }
    async deleteStadium(id: string) {
        return await http.delete(`/stadium/${id}`);
    }
    async updateArea(stdId: string, areaId: string, data: any) {
        return await http.put(`/area/update/${stdId}/${areaId}`, data);
    }
    async createArea(stdId: string, data: any) {
        return await http.post(`/area/create/${stdId}`, data);
    }
    async deleteArea(stdId: string, areaId: string) {
        return await http.delete(`/area/delete/${stdId}/${areaId}`);
    }
}

export default new StadiumService();
