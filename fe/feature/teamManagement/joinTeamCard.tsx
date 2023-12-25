import { useState } from 'react';
import { Grid, Modal, Typography } from '@mui/material';

import DefaultTeamAvatar from '../../public/li.jpg';

import { MemberTable } from './joinTeamMember';
import LeaveTeam from './leaveTeam';
import { ButtonStyle } from '../../components/button';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import { Img, PaperStyles } from './styles';
import { ITeam, IUser } from './interfaces';

export const Card = ({ data }: { data: ITeam }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleDelete = () => {
        setOpenModal(true);
        setShowDetail(false);
    };
    const handleDetail = () => {
        setOpenModal(true);
        setShowDetail(true);
    };
    return (
        <>
            <PaperStyles elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12} m={'auto'}>
                        <Img alt="complex" src={data.avatar || DefaultTeamAvatar.src} />
                    </Grid>
                    <Grid item md={9} xs={12} container>
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
                            </Grid>
                            <Grid item sx={{ textAlign: 'right' }}>
                                <ButtonStyle variant="contained" sx={{ marginRight: 2 }} onClick={handleDetail}>
                                    Thành viên
                                </ButtonStyle>
                                <ButtonStyle variant="contained" onClick={handleDelete}>
                                    Rời
                                </ButtonStyle>
                                <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <>
                                        {showDetail ? (
                                            <MemberTable rows={data.members as IUser[]} />
                                        ) : (
                                            <LeaveTeam handleCloseModal={handleCloseModal} data={data} />
                                        )}
                                    </>
                                </Modal>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PaperStyles>
        </>
    );
};
