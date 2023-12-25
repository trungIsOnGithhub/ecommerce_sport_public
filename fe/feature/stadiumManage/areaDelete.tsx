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
const AreaDelete = ({ data, handleCloseModal, setDataArea }: any) => {
    const { resData, error, loading, setParams } = useAxios(stadiumService.deleteArea);
    const handleDelete = () => {
        setParams([data.stadium, data._id]);
    };
    useEffect(() => {
        if (resData) {
            setDataArea((pre: any) => pre.filter((e: any) => e._id !== data._id));
        }
    }, [data._id, resData, setDataArea]);
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
                    Hủy bỏ
                </ButtonWhiteStyle>
                <ButtonStyle variant="contained" loading={loading} sx={{ marginLeft: '10px' }} onClick={handleDelete}>
                    Đồng ý
                </ButtonStyle>
            </Box>
        </PaperStyle>
    );
};

export default AreaDelete;
