import { useContext, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { TypographyHeading2Style } from './styles';
import AlertCustom from '../../components/alert';
import OrderService from '../../services/orderService';
import { DataPaymentType } from './interfaces';
import { OrderContext } from './stepper';

interface IPaymentMethod {
    data: DataPaymentType;
    updateData: Function;
    verifyPayment: boolean;
    handleNext: Function;
}

export const PaymentMethod = ({ data, updateData, verifyPayment, handleNext }: IPaymentMethod) => {
    const { dispatch } = useContext(OrderContext);
    const [typePaymentMethod, setTypePaymentMethod] = useState<string>('Cash');
    const [errorOTP, setErrorOTP] = useState(false);
    const [emptyBill, setEmptyBill] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setTypePaymentMethod(value);
        updateData('payment_method', value);
    };

    const handleOnSubmit = async (event: any) => {
        if (data.stadium_areas.length === 0) {
            setEmptyBill(true);
        }
        if (verifyPayment && data.stadium_areas.length > 0) {
            // if (data.stadium_areas.length > 0) {
            setErrorOTP(false);
            try {
                const orderRes = await OrderService.createOrder(data as any);
                dispatch(orderRes.data.data.order);
                if (typePaymentMethod === 'Stripe') {
                    const payment = await OrderService.payment_byVisa(orderRes.data.data.order._id);
                    window.open(payment.data.session.url, '_blank');
                }
                handleNext();
            } catch (error) {
                // console.log(error);
            }
        } else setErrorOTP(true);
    };
    return (
        <Box mt={5}>
            <TypographyHeading2Style sx={{ fontSize: 25 }}>Phương thức thanh toán</TypographyHeading2Style>
            {errorOTP && <AlertCustom type="error" message="Xác thực OTP chưa thành công!" />}
            {emptyBill && <AlertCustom type="error" message="Không có đơn hàng thanh toán!" />}

            <FormControl fullWidth>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={typePaymentMethod ?? '1'}
                    name="radio-buttons-group"
                    sx={{ p: 2 }}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Cash" control={<Radio />} label="Thanh toán trực tiếp" />
                    <FormControlLabel value="Stripe" control={<Radio />} label="Thanh toán bằng thẻ VISA" />
                </RadioGroup>
                <Button variant="contained" sx={{ p: '2 auto' }} onClick={handleOnSubmit} disabled={!verifyPayment}>
                    Thanh toán
                </Button>
                {verifyPayment ? null : (
                    <Box
                        sx={{
                            color: 'red',
                            fontSize: '14px',
                            margin: '5px',
                        }}
                    >
                        * Cần xác thực OTP để thực hiện thao tác này
                    </Box>
                )}
            </FormControl>
        </Box>
    );
};
