import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, styled } from '@mui/material';
import React from 'react';
import AlertCustom from '../../components/alert';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { useAxios } from '../../hooks';
import orderService from '../../services/orderService';
const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '20px auto',
    width: '600px',
    overflowY: 'scroll',
});
const OrderDelete = ({ orderCurr, setOrders, handleCloseModal }: any) => {
    const { resData, error, loading, setParams } = useAxios(orderService.deleteOrder);
    React.useEffect(() => {
        if (resData) {
            setOrders((pre: any) => {
                return pre.filter((e: any) => e._id !== orderCurr._id);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resData, setOrders]);

    const handleDeleteOrder = () => {
        setParams([orderCurr._id]);
    };
    return (
        <>
            {resData ? <AlertCustom type="success" message="Cập nhật thành công" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <PaperStyle>
                <DialogTitle>Bạn có chắc chắn muốn xóa ?</DialogTitle>
                <DialogActions>
                    <ButtonWhiteStyle variant="contained" onClick={handleCloseModal}>
                        Disagree
                    </ButtonWhiteStyle>
                    <ButtonStyle variant="contained" onClick={handleDeleteOrder}>
                        Agree
                    </ButtonStyle>
                </DialogActions>
            </PaperStyle>
        </>
    );
};

export default OrderDelete;
