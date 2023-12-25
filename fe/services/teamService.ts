import { http } from '../utils/axios';

class TeamService {
    async createTeam(data: any, config?: any) {
        return await http.post<any>('/team/create_team', data, config);
    }
    async updateTeam(id: string, data: any, config?: any) {
        return await http.patch(`/team/update_team/${id}`, data, config);
    }
    async deteteTeam(id: string) {
        return await http.delete(`/team/delete_team/${id}`);
    }
    async getJoinTeam(query: any) {
        return await http.get<any>('/team/get_teams_by_member_id');
    }
    async getMainTeam() {
        return await http.get<any>('/team/get_teams_by_leader_id');
    }
    async leaveTeam(id: string) {
        return await http.patch<any>(`/team/leave_team/${id}`);
    }
    async kickOutMember(id: string, kickedMember: string) {
        return await http.patch<any>(`/team/kick_out_member/${id}`, { kickedMember: kickedMember });
    }
    async searchTeam(data: any, limit?: any) {
        return await http.get<any>(`/team/get_teams_by_name?name=${data}&limit=${limit || ''}`);
    }
}
export default new TeamService();
