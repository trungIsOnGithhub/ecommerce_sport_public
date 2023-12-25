import { useContext } from 'react';
import moment from 'moment';
import { Chip, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { TypographySubheadingStyle } from './styles';
import { OrderContext } from './stepper';
import { VND } from '../../utils/helper';

const ChipLabel = ({ text }: { text: string }) => {
    switch (text) {
        case 'Cash':
            return <Chip label={'Tiền mặt'} color="success" />;
        case 'Stripe':
            return <Chip label={'Stripe'} color="primary" />;
        default:
            break;
    }
    return <></>;
};

export const OrderReceiver = () => {
    const { state } = useContext(OrderContext);
    return (
        <Container sx={{ m: 4 }}>
            <DoneIcon sx={{ fontSize: '70px', width: '100%', color: (theme) => theme.color.main }} />
            <TypographySubheadingStyle>Hoàn tất đặt sân</TypographySubheadingStyle>
            <Paper elevation={3} sx={{ padding: 2, lineHeight: 2, width: { xs: '100%', md: '75%' }, margin: '0 auto' }}>
                <Stack
                    spacing={2}
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Stack>
                        <b>Đơn hàng</b>
                        <Typography>{state.id.slice(-5)}</Typography>
                    </Stack>
                    <Stack>
                        <b>Thời gian</b>
                        <Typography>{moment(state.createAt).format('HH[h]mm, DD/MM/YYYY').toString()}</Typography>
                    </Stack>
                    <Stack>
                        <b>Phương thức thanh toán</b>
                        <ChipLabel text={state.payment_method} />
                    </Stack>
                    <Stack>
                        <b>Tổng tiền</b>
                        <Typography>{VND.format(state.total_cost)}</Typography>
                    </Stack>
                    <Stack>
                        <b>Trạng thái</b>
                        <Typography>{state.status === false ? 'Chưa thanh toán' : 'Đã thanh toán'}</Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
};
