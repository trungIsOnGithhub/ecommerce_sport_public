import { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import AlertCustom from '../../components/alert';
import { ButtonStyle } from '../../components/button';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import { Img, PaperStyles } from './styles';
import { IInvitation, ITeam } from './interfaces';
import invitationService from '../../services/invitationService';

export const InvitationCard = ({ invitation, type }: { invitation: IInvitation; type: string }) => {
    const [showDetail, setShowDetail] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [data, setData] = useState<ITeam>({
        avatar: invitation.team.avatar,
        quantity: invitation.team.quantity,
        age: invitation.team.age,
        level: invitation.team.level,
        description: invitation.team.description,
        contact: invitation.team.contact,
        name: invitation.team.name,
        members: invitation.team.members,
    });
    const handleAccept = async (type: string) => {
        switch (type) {
            case 'Accepted': {
                const res = await invitationService.updateStatusInvitation(invitation._id as string, 'Accepted');
                if (res.data) {
                    setShowDetail(false);
                    setMessage('Accepted');
                } else {
                    setMessage('Error');
                }
                break;
            }
            case 'Rejected': {
                const res = await invitationService.updateStatusInvitation(invitation._id as string, 'Rejected');
                if (res.data) {
                    setShowDetail(false);
                    setMessage('Rejected');
                } else {
                    setMessage('Error');
                }
                break;
            }
            default: {
                setMessage('Error');
                break;
            }
        }
        let timer: any;
        timer = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    };
    return (
        <>
            {!showDetail && message === 'Accepted' && (
                <AlertCustom type="success" message="Bạn đã tham gia nhóm thành công!" />
            )}
            {!showDetail && message === 'Rejected' && <AlertCustom type="success" message="Từ chối tham gia nhóm" />}
            {!showDetail && message === 'Error' && <AlertCustom type="error" message="Xử lý gặp lỗi" />}
            {showDetail && (
                <PaperStyles elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12} m={'auto'}>
                            <Img alt="complex" src={data.avatar} />
                        </Grid>
                        <Grid item md={8} xs={12} container>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <TypographyHeading2Style>{data.name}</TypographyHeading2Style>
                                    <Grid container>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body2" gutterBottom>
                                                <b> Thành viên:</b> {data.quantity}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body2" gutterBottom>
                                                <b> Độ tuổi:</b> {data.age}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body2" gutterBottom>
                                                <b> Liên hệ:</b> {data.contact}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body2" gutterBottom>
                                                <b> Trình độ:</b> {data.level}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body2" color="text.secondary">
                                        {data.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>Lời nhắn: </b>
                                        {invitation.message}
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ textAlign: 'right' }}>
                                    {type === 'Invitation' && (
                                        <>
                                            <ButtonStyle
                                                variant="contained"
                                                sx={{ marginRight: 2 }}
                                                onClick={() => handleAccept('Accepted')}
                                            >
                                                Chấp nhận
                                            </ButtonStyle>
                                            <ButtonStyle
                                                variant="contained"
                                                sx={{ marginRight: 2 }}
                                                onClick={() => handleAccept('Rejected')}
                                            >
                                                Từ chối
                                            </ButtonStyle>
                                        </>
                                    )}
                                    {type === 'Suggestion' && (
                                        <ButtonStyle
                                            variant="contained"
                                            sx={{ marginRight: 2 }}
                                            onClick={() => handleAccept('')}
                                        >
                                            Tham gia
                                        </ButtonStyle>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </PaperStyles>
            )}
        </>
    );
};
