import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../feature/teamManagement/styles';
import { VND } from '../utils/helper';

export default function BasicTable({ dataRows, defaultPrice }: any) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Thời gian</StyledTableCell>
                        <StyledTableCell align="right">Giá thuê sân (VND/ giờ)</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {dataRows.map((row: any, index: any) => (
                        <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell component="th" scope="row">
                                Từ {row.from} giờ đến {row.to} giờ
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <b>{VND.format(row.price)}</b>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Các giờ còn lại
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <b>{VND.format(defaultPrice)}</b>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
