import { http } from '../utils/axios';

class MatchService {
    async createMatch(data: any) {
        return await http.post<any>(`/match/create_match`, data);
    }
    async getOwnMatch() {
        return await http.get<any>('/match/get_own_matchs');
    }
    async getUnassignMatch() {
        return await http.get<any>('/match/get_matchs_without_assign');
    }
    async acceptAssignMatch(id: string, data: any) {
        return await http.patch<any>(`/match/accept_assign_team/${id}`, data);
    }
    async getMatchsByTeamId(teamId: string) {
        return await http.get<any>(`/match/get_matchs_by_team_id`, {
            params: {
                teamId,
            },
        });
    }
    async assignMatchQueue(data: any) {
        return await http.post<any>('/match/assign_match_queue', data);
    }
}
export default new MatchService();
