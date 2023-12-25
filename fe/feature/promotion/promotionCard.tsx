import moment from 'moment';
import { useState, useCallback } from 'react';
import { Modal, Grid, Typography } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import BusinessIcon from '@mui/icons-material/Business';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { TypographyHeading2Style } from '../../components/typographyHeading';

import EditPromotion from './editPromotion';
import DeletePromotion from './deletePromotion';

import { PaperStyles, Img } from './styles';
import { IPromotion } from './interfaces';

const DiscountCard = ({ data }: { data: IPromotion }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const handleCloseModal = useCallback(() => setOpenModal(false), []);
    const handleEditAction = () => {
        setAction('EDIT');
        setOpenModal(true);
    };
    const handleDeleteAction = () => {
        setAction('DELETE');
        setOpenModal(true);
    };
    return (
        <>
            <PaperStyles elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={4} m={'auto'}>
                        <Img alt="complex" src={data.image} />
                    </Grid>
                    <Grid item xs={8} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <TypographyHeading2Style>{`${data.type} - ${data.name}`}</TypographyHeading2Style>
                                <Typography variant="body2" gutterBottom>
                                    <QueryBuilderIcon />
                                    <b>Thời gian áp dụng:</b>{' '}
                                    {moment(data.start_date).format('HH[h]mm, DD/MM/YYYY').toString()} đến{' '}
                                    {moment(data.end_date).format('HH[h]mm, DD/MM/YYYY').toString()}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <BusinessIcon />
                                    <b>Địa điểm:</b> {`Sân ${data.stadium?.name}`}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <LoyaltyIcon />
                                    <b>Mức giảm giá:</b> {data.percent ? `${data.percent} (%)` : null}{' '}
                                    {data.money ? `${data.money} (VND)` : null}
                                </Typography>
                                {data.quantity ? (
                                    <Typography variant="body2" gutterBottom>
                                        <LoyaltyIcon />
                                        <b>Số lượng:</b> {data.quantity}
                                    </Typography>
                                ) : null}
                                <Typography variant="body2" color="text.secondary">
                                    {data.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonStyle
                                    variant="contained"
                                    sx={{ float: 'right', mr: '10px' }}
                                    onClick={handleEditAction}
                                >
                                    Sửa
                                </ButtonStyle>
                                <ButtonWhiteStyle
                                    variant="contained"
                                    sx={{ float: 'right', mr: '10px' }}
                                    onClick={handleDeleteAction}
                                >
                                    Xóa
                                </ButtonWhiteStyle>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PaperStyles>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    {action === 'EDIT' ? <EditPromotion data={data} /> : null}
                    {action === 'DELETE' ? <DeletePromotion data={data} handleCloseModal={handleCloseModal} /> : null}
                </>
            </Modal>
        </>
    );
};

export default DiscountCard;
