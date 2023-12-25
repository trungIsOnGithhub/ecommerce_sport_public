import { Box, ImageList, ImageListItem, Paper, styled, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import { useAxios } from '../../hooks';
import AlertCustom from '../../components/alert';
import teamService from '../../services/teamService';
import { TeamContext } from './tabs';

const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '30px auto',
});
const MainTeamDelete = ({
    data,
    handleCloseModal,
    handleCloseMenu,
}: {
    data: any;
    handleCloseModal: any;
    handleCloseMenu: any;
}) => {
    const { state, dispatch, isAlert } = useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(teamService.deteteTeam);
    const handleDelete = () => {
        setParams([data._id]);
    };
    useEffect(() => {
        if (resData) {
            dispatch((pre: any) => pre.filter((e: any) => e._id !== data._id));
            handleCloseModal();
            handleCloseMenu();
            isAlert('Xóa đội bóng thành công!');
        }
    }, [resData, dispatch]);
    return (
        <PaperStyle elevation={10} sx={{ width: { xs: '85%', md: '500px' } }}>
            {/* {resData ? <AlertCustom type="success" message="Delete successfull" /> : null} */}
            {error ? <AlertCustom type="error" message={'Xóa đội bóng thất bại!'} /> : null}
            <Typography textAlign="center">
                <strong> {`Bạn có chắc chắn muốn xóa?`}</strong>
            </Typography>
            <Typography textAlign="center">
                <strong>Đội bóng </strong>
                {data.name}
            </Typography>
            <Box sx={{ textAlign: 'end', marginTop: '20px' }}>
                <ButtonStyle variant="contained" loading={loading} onClick={handleDelete}>
                    Đồng ý
                </ButtonStyle>
                <ButtonWhiteStyle variant="contained" onClick={handleCloseModal} sx={{ marginLeft: '10px' }}>
                    Hủy
                </ButtonWhiteStyle>
            </Box>
        </PaperStyle>
    );
};

export { MainTeamDelete };
