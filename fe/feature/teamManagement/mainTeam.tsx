import * as React from 'react';
import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { TeamContext } from './tabs';
import { MainTeamDelete, MainTeamUpdate } from './index';
import { StyledTableCell, StyledTableRow } from './styles';
import { ITeam } from './interfaces';

export function MainTeam({
    setShowElement,
    setDataDetail,
}: {
    setShowElement: React.Dispatch<React.SetStateAction<boolean>>;
    setDataDetail: React.Dispatch<React.SetStateAction<ITeam>>;
}) {
    const { state } = React.useContext(TeamContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [rowCurr, setRowCurr] = React.useState<ITeam>({});
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>, row: ITeam) => {
        setAnchorEl(event.currentTarget);
        setRowCurr(row);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };
    const handleDelete = (row: ITeam) => {
        setOpenModal(true);
    };
    const handleDetail = (row: ITeam) => {
        setShowElement(true);
        setDataDetail(row);
    };
    const handleUpdate = (row: ITeam) => {
        setOpenUpdate(true);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Avatar</StyledTableCell>
                        <StyledTableCell>Tên đội</StyledTableCell>
                        <StyledTableCell>Số thành viên</StyledTableCell>
                        <StyledTableCell>Độ tuổi</StyledTableCell>
                        <StyledTableCell>Trình độ</StyledTableCell>
                        <StyledTableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.length > 0 ? (
                        state.map((row: ITeam, index: number) => {
                            return (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar alt="Remy Sharp" src={row.avatar} />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>
                                        {row.members?.length}/{row.quantity}
                                    </StyledTableCell>
                                    <StyledTableCell>U{row.age}</StyledTableCell>
                                    <StyledTableCell>{row.level}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={(e: any) => handleClickMenu(e, row)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell>Chưa có đội bóng nào của bạn.</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleDetail(rowCurr)}>
                    <InfoIcon color="info" />
                    Xem chi tiết
                </MenuItem>
                <MenuItem onClick={() => handleUpdate(rowCurr)}>
                    <EditIcon color="success" />
                    Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={() => handleDelete(rowCurr)}>
                    <DeleteIcon color="error" />
                    Xóa
                </MenuItem>
            </Menu>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <>
                    <MainTeamDelete
                        handleCloseModal={handleCloseModal}
                        data={rowCurr}
                        handleCloseMenu={handleCloseMenu}
                    />
                </>
            </Modal>
            <Modal
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="update-modal-title"
                aria-describedby="update-modal-description"
            >
                <>
                    <MainTeamUpdate
                        handleCloseModal={handleCloseUpdate}
                        data={rowCurr}
                        handleCloseMenu={handleCloseMenu}
                    />
                </>
            </Modal>
        </TableContainer>
    );
}
