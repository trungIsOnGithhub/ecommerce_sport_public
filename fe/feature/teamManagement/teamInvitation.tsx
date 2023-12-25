import { useState, useEffect } from 'react';
import {
    Avatar,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Box,
    Button,
    Chip,
    ButtonGroup,
} from '@mui/material';

import PartTile from '../../components/parttitle';
import invitationService from '../../services/invitationService';
import { IInvitation } from './interfaces';
import { StyledTableCell, StyledTableRow } from './styles';
// Invitations By Team

const ChipLabel = ({ text }: { text: string }) => {
    switch (text) {
        case 'Accepted':
            return <Chip label={'Chấp nhận'} color="primary" />;
        case 'Unaccepted':
            return <Chip label={'Chưa chấp nhận'} color="default" />;
        case 'Rejected':
            return <Chip label={'Từ chối'} color="error" />;
        default:
            break;
    }
    return <></>;
};
export const TeamInvitation = ({ id }: { id: string }) => {
    const [rows, setRows] = useState<IInvitation[]>([]);
    const [queue, setQueue] = useState<IInvitation[]>([]);

    const [action, setAction] = useState<boolean>(true);
    const handleAccept = async (id: string, type: string) => {
        const res = await invitationService.updateStatusInvitation(id, type);
        if (res.data) {
            setAction(!action);
        } else {
        }
    };

    const handleReject = async () => {};

    useEffect(() => {
        const getTeamInvitation = async () => {
            const res = await invitationService.getInvitationsByTeam(id);
            setRows(res.data.data.invitations.filter((invitation: IInvitation) => invitation.status !== 'Unaccepted'));
            setQueue(res.data.data.invitations.filter((invitation: IInvitation) => invitation.status === 'Unaccepted'));
        };
        getTeamInvitation();
    }, [action]);
    return (
        <>
            <PartTile title="Yêu cầu tham gia chờ duyệt" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Avatar</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>SĐT</StyledTableCell>
                            <StyledTableCell>Địa chỉ</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {queue.length > 0 ? (
                            queue.map((row: IInvitation, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar alt="Remy Sharp" src={row.user.avatar} />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.user.name}</StyledTableCell>
                                    <StyledTableCell>{row.user.phone}</StyledTableCell>
                                    <StyledTableCell>{row.user.address}</StyledTableCell>
                                    <StyledTableCell>
                                        <ChipLabel text={row.status} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <ButtonGroup size="small" aria-label="outlined primary button group">
                                            <Button
                                                variant="contained"
                                                onClick={() => handleAccept(row._id as string, 'Accepted')}
                                            >
                                                Chấp nhận
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleAccept(row._id as string, 'Rejected')}
                                            >
                                                Từ chối
                                            </Button>
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell>Chưa có yêu cầu tham gia nào.</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <PartTile title="Lịch sử lời mời tham gia đội" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Avatar</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>SĐT</StyledTableCell>
                            <StyledTableCell>Địa chỉ</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row: IInvitation, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar alt="Remy Sharp" src={row.user.avatar} />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.user.name}</StyledTableCell>
                                    <StyledTableCell>{row.user.phone}</StyledTableCell>
                                    <StyledTableCell>{row.user.address}</StyledTableCell>
                                    <StyledTableCell>
                                        <ChipLabel text={row.status} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell>Chưa có thành viên nào trong đội.</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
