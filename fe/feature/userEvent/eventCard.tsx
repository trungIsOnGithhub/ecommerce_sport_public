import { useState } from 'react';
import { Grid, Typography, Modal } from '@mui/material';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import { ButtonStyle } from '../../components/button';
import { Img, PaperStyles } from './styles';

export const Card = ({ data }: { data: any }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <PaperStyles elevation={3}>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12} m={'auto'}>
                        <Img alt="complex" src={data.image} />
                    </Grid>
                    <Grid item md={8} xs={12} container>
                        <Grid xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <TypographyHeading2Style>{data.name}</TypographyHeading2Style>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Thời gian:</b> {data.time}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Số lượng:</b> {data.teams.length} / {data.quantity}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b>Độ tuổi:</b> {data.age}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            <b> Trình độ:</b> {data.level}
                                        </Typography>
                                    </Grid>
                                    <Typography variant="body2" gutterBottom>
                                        <b> Địa chỉ:</b> {data.stadium.name} - {data.stadium.address}
                                    </Typography>
                                </Grid>
                                <Typography variant="body2" color="text.secondary">
                                    {data.description}
                                </Typography>
                            </Grid>
                            <Grid item sx={{ textAlign: 'right' }}>
                                <ButtonStyle variant="contained" sx={{ marginRight: 2 }}>
                                    Chi tiết
                                </ButtonStyle>
                                <ButtonStyle variant="contained">Đăng ký</ButtonStyle>
                                <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <></>
                                </Modal>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PaperStyles>
        </>
    );
};
