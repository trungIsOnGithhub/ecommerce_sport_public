import { useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { useAxios } from '../../hooks';
import AlertCustom from '../../components/alert';
import { ButtonStyle, ButtonWhiteStyle } from '../../components/button';
import teamService from '../../services/teamService';

import { JoinTeamContext } from './joinTeam';
import { TeamContext } from './tabs';

import { ITeam } from './interfaces';
import { PaperStyle } from './styles';

const LeaveTeam = ({ data, handleCloseModal }: { data: ITeam; handleCloseModal: any }) => {
    const { dispatch } = useContext(JoinTeamContext);
    const { isAlert } = useContext(TeamContext);
    const { resData, error, loading, setParams } = useAxios(teamService.leaveTeam);
    const handleDelete = async () => {
        setParams([data._id]);
    };
    useEffect(() => {
        if (resData) {
            dispatch((prev: ITeam[]) => prev.filter((e: ITeam) => e._id !== data._id));
            isAlert(`Rời đội ${data.name} thành công!`);
        }
    }, [resData]);
    return (
        <PaperStyle elevation={10}>
            {error ? <AlertCustom type="error" message={'something went wrong'} /> : null}
            <Typography textAlign="center">
                <strong> {`Bạn có chắc chắn muốn rời khỏi?`}</strong>
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

export default LeaveTeam;
