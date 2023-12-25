import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import { Container, Typography, styled } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from 'next/router';
import orderService from '../services/orderService';

export const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
    margin: '20px auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: theme.color.main,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
}));

const Booking: NextPageWithLayout = () => {
    const route = useRouter();
    const order_id = route.query.order_id ? (route.query.order_id as string) : '';
    const user = route.query.user ? (route.query.user as string) : '';

    if (!order_id && !user)
        return (
            <Container sx={{ textAlign: 'center' }}>
                <DoneIcon sx={{ fontSize: '70px', width: '100%', color: (theme) => theme.color.main }} />
                <TypographyHeading2Style>Thanh toán thất bại</TypographyHeading2Style>
            </Container>
        );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const updatePayment = async () => {
            await orderService.updatePaymentSuccessful(order_id, user);
        };
        updatePayment();
    }, [order_id, user]);

    return (
        <Container sx={{ textAlign: 'center' }}>
            <DoneIcon sx={{ fontSize: '70px', width: '100%', color: (theme) => theme.color.main }} />
            <TypographyHeading2Style>Thanh toán thành công</TypographyHeading2Style>
        </Container>
    );
};
Booking.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default Booking;
