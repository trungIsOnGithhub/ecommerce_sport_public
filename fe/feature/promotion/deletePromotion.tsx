import { useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useAxios } from '../../hooks';
import promotionService from '../../services/promotionService';
import AlertCustom from '../../components/alert';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { PromotionConext } from '../../pages/owner/promotion_management';

import { PaperDeleteStyle } from './styles';
import { IPromotion } from './interfaces';

const DeletePromotion = ({ data, handleCloseModal }: { data: IPromotion; handleCloseModal: any }) => {
    const { state, dispatch } = useContext(PromotionConext);
    const { resData, error, loading, setParams } = useAxios(promotionService.deletePromotion);

    const handleDelete = async () => {
        setParams([data._id]);
    };

    useEffect(() => {
        if (resData) {
            dispatch((state: IPromotion[]) => state.filter((item: IPromotion) => item._id !== data._id));
        }
    }, [data._id, dispatch, resData]);

    return (
        <PaperDeleteStyle elevation={10}>
            {resData ? <AlertCustom type="success" message="Xóa thành công" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <Typography>
                <strong> {`Bạn có chắc chắn muốn xóa?`}</strong>
            </Typography>
            <Box sx={{ textAlign: 'end', marginTop: '20px' }}>
                <ButtonWhiteStyle variant="contained" onClick={handleCloseModal}>
                    Hủy
                </ButtonWhiteStyle>
                <ButtonStyle variant="contained" loading={loading} sx={{ marginLeft: '10px' }} onClick={handleDelete}>
                    Đồng ý
                </ButtonStyle>
            </Box>
        </PaperDeleteStyle>
    );
};

export default DeletePromotion;
