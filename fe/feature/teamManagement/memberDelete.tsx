import { useEffect, useContext } from 'react';
import { Box, Paper, styled, Typography } from '@mui/material';
import { useAxios } from '../../hooks';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import AlertCustom from '../../components/alert';
import teamService from '../../services/teamService';
import { TeamContext } from './tabs';
import { IUser } from './interfaces';
import { PaperStyle } from './styles';

const MainTeamDelete = ({ teamId, data, handleCloseModal }: { teamId: string; data: IUser; handleCloseModal: any }) => {
    const { isAlert } = useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(teamService.kickOutMember);
    const handleDelete = async () => {
        setParams([teamId, data._id]);
    };
    useEffect(() => {
        if (resData) {
            // setDataArea((pre: any) => pre.filter((e: any) => e._id !== data._id));
            isAlert(`Đã xóa ${data.name} khỏi đội bóng!`);
            handleCloseModal();
        }
    }, [resData]);
    return (
        <PaperStyle elevation={10}>
            {/* {resData ? <AlertCustom type="success" message="Delete successfull" /> : null} */}
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <Typography textAlign="center">
                <strong> {`Bạn có chắc chắn muốn xóa?`}</strong>
            </Typography>
            <Typography textAlign="center">
                <strong>Thành viên </strong>
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

export default MainTeamDelete;
