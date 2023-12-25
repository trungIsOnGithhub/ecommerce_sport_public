import { Box, ImageList, ImageListItem, Paper, styled, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { useAxios } from '../../hooks';
import { RowsContext } from '../../pages/owner/stadium_management';
import stadiumService from '../../services/stadiumService';
import AlertCustom from '../../components/alert';

const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '30px auto',
});
const StadiumDelete = ({ data, handleCloseModal }: any) => {
    const { state, dispatch } = useContext(RowsContext);
    const { resData, error, loading, setParams } = useAxios(stadiumService.deleteStadium);
    const handleDelete = () => {
        setParams([data._id]);
    };

    useEffect(() => {
        if (resData) {
            dispatch((state: any) => state.filter((item: any) => item._id !== data._id));
        }
    }, [data._id, dispatch, resData]);
    return (
        <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
            {resData ? <AlertCustom type="success" message="Xóa thành công" /> : null}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <Typography>
                <strong> {`Bạn có chắc chắn muốn xóa?`}</strong>
            </Typography>
            <Typography>
                <strong>{`Thông tin sân bóng: `}</strong>
                {`ID(${data._id.slice(-5)}) Tên(${data.name})`}
            </Typography>
            <Box sx={{ textAlign: 'end', marginTop: '20px' }}>
                <ButtonWhiteStyle variant="contained" onClick={handleCloseModal}>
                    Từ chối
                </ButtonWhiteStyle>
                <ButtonStyle variant="contained" loading={loading} sx={{ marginLeft: '10px' }} onClick={handleDelete}>
                    Đồng ý
                </ButtonStyle>
            </Box>
        </PaperStyle>
    );
};

export default StadiumDelete;
