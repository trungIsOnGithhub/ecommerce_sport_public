import { Avatar, Paper, TableContainer, Table, TableHead, TableRow, TableBody, Box } from '@mui/material';
import PartTile from '../../components/parttitle';
import { IUser } from './interfaces';
import { StyledTableCell, StyledTableRow } from './styles';

export function MemberTable({ rows }: { rows: IUser[] }) {
    return (
        <Paper sx={{ width: '70%', padding: '20px', margin: 'auto', marginTop: '40px' }}>
            <PartTile title={'Danh sách thành viên'} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Avatar</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>SĐT</StyledTableCell>
                            <StyledTableCell>Địa chỉ</StyledTableCell>
                            {/* <StyledTableCell /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row: IUser, index: number) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Avatar alt="Remy Sharp" src={row.photo} />
                                    </StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.phone}</StyledTableCell>
                                    <StyledTableCell>{row.address}</StyledTableCell>
                                    {/* <StyledTableCell>
                                    <IconButton>
                                        <MoreVertIcon onClick={(e: any) => handleClickMenu(e, row)} />
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                        <MenuItem onClick={() => handleDetail(rowCurr)}>
                                            <InfoIcon color="info" />
                                            Xem chi tiết
                                        </MenuItem>
                                        <MenuItem onClick={() => handleDelete(rowCurr)}>
                                            <DeleteIcon color="error" />
                                            Xóa
                                        </MenuItem>
                                        <Modal
                                            open={openModal}
                                            onClose={handleCloseModal}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <MemberDelete handleCloseModal={handleCloseModal} data={rowCurr} />
                                        </Modal>
                                    </Menu>
                                </StyledTableCell> */}
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
        </Paper>
    );
}
