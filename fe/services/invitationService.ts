import { http } from '../utils/axios';
class InvitationService {
    async createInvitationByLeader(data: any, config?: any){
        return await http.post<any>('/invitation/create_invitation_by_leader', data);
    }
    async createInvitationByUser(data: any, config?: any){
        return await http.post<any>('/invitation/create_invitation_by_user', data);
    }
    async updateStatusInvitation(id: string, status: string){
        return await http.patch<any>(`/invitation/update_status_intivation/${id}`, {status: status});
    }
    async deleteStatusInvitation(id: string){
        return await http.delete<any>(`/invitation/delete_status_intivation/${id}`);
    }
    async getInvitationsByUser(){
        return await http.get<any>('/invitation/get_invitations_by_user');
    }
    async getInvitationsByTeam(id: string){
        return await http.get<any>(`/invitation/get_invitations_by_team/${id}`);
    }
}

export default new InvitationService();