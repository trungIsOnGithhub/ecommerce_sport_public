import { Box, Paper, styled, Typography } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useEffect, useState, memo } from 'react';
import { ButtonWhiteStyle } from '../../components/button';
import { useAxios } from '../../hooks';
import AlertCustom from '../../components/alert';
import orderService from '../../services/orderService';

const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
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
const BoxFormControlStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0.9',
    gap: 10,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
    },
}));
const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '20px auto',
    height: '500px',
    overflowY: 'scroll',
});

const OrderEdit = ({ orderCurr, setOrders }: any) => {
    const { resData, error, loading, setParams } = useAxios(orderService.updateStatusPayment);

    const [data, setData] = useState({
        status: orderCurr.status,
        payment_method: orderCurr.payment_method || '',
    });
    useEffect(() => {
        setOrders((pre: any) => {
            const order = pre.find((e: any) => e._id === orderCurr._id);
            order.status = data.status;
            order.payment_method = data.payment_method;
            return pre;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resData, setOrders]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        setParams([
            orderCurr._id,
            {
                status: data.status,
                payment_method: data.payment_method,
            },
        ]);
    };
    return (
        <>
            {resData ? <AlertCustom type="success" message="Cập nhật thành công" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
                <TypographyHeading2Style>Sửa thông tin đặt sân</TypographyHeading2Style>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            <strong>Trạng thái thanh toán</strong>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={data.status}
                            name="status"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="false" control={<Radio />} label="Chưa thanh toán" />
                            <FormControlLabel value="true" control={<Radio />} label="Đã thanh toán" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label-1">
                            <strong>Phương thức thanh toán</strong>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label-1"
                            defaultValue={data.payment_method}
                            name="payment_method"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Stribe" control={<Radio />} label="Stribe" />
                            <FormControlLabel value="Cash" control={<Radio />} label="Tiền mặt" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <ButtonWhiteStyle variant="contained" size="small" loading={loading} onClick={handleSubmit}>
                        Chỉnh sửa
                    </ButtonWhiteStyle>
                </Box>
            </PaperStyle>
        </>
    );
};

export default memo(OrderEdit);
