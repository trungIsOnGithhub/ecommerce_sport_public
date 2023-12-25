import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PartTile from '../../components/parttitle';
import invitationService from '../../services/invitationService';
import { IInvitation } from './interfaces';
import { InvitationCard } from './invitationCard';

const Invitation = () => {
    const [invitations, setInvitations] = useState<IInvitation[]>([]);
    const suggestions: any[] = [];

    useEffect(() => {
        const getInvitations = async () => {
            const res = await invitationService.getInvitationsByUser();
            setInvitations(res.data.data.invitations);
        };
        getInvitations();
    }, []);
    return (
        <>
            <PartTile title={'Lời mời tham gia đội'} />
            {invitations.length > 0 ? (
                invitations.map((invitation: IInvitation) => (
                    <InvitationCard key={invitation._id} invitation={invitation} type={'Invitation'} />
                ))
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có lời mời tham gia đội.
                </Typography>
            )}
            {/* <PartTile title={'Gợi ý'} />
            {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                    <InvitationCard key={suggestion._id} invitation={suggestion} type={'Suggestion'} />
                ))
            ) : (
                <Typography variant="body2" gutterBottom m={2}>
                    Chưa có team phù hợp cho bạn.
                </Typography>
            )} */}
        </>
    );
};
export default Invitation;
