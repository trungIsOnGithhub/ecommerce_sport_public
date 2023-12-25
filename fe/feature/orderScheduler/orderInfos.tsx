import {
    Box,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { memo } from 'react';
import { VND } from '../../utils/helper';

const TemBoxStyle = styled('span', {
    shouldForwardProp: (prop) => prop !== 'color',
})(({ theme, color }) => ({
    backgroundColor: color,
    borderRadius: '20px',
    margin: 'auto',
    padding: '3px 10px',
}));

const TemBox = ({ text, color }: any) => {
    return <TemBoxStyle color={color}>{text}</TemBoxStyle>;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 15,
        backgroundColor: '#b8ffd5',
        fontWeight: '700',
        textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#ecfff3',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'white',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
    margin: '20px auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: theme.color.main,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
}));

const OrderInfos = ({ orderInfo }: any) => {
    return (
        <Paper sx={{ width: '80%', padding: '20px', margin: 'auto', marginTop: '40px' }}>
            <TypographyHeading2Style>Thông tin các đơn đặt sân</TypographyHeading2Style>
            <TableContainer sx={{ padding: '20px', margin: '50px auto' }} component={Paper}>
                <Table sx={{ minWidth: 1400 }} aria-label="customized table" style={{ tableLayout: 'auto' }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>Số điện thoại</StyledTableCell>
                            <StyledTableCell>Thời gian đặt - Loại sân</StyledTableCell>
                            <StyledTableCell>Tổng tiền</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                            <StyledTableCell>PTTT</StyledTableCell>
                            <StyledTableCell>Ngày tạo</StyledTableCell>
                            <StyledTableCell>CTKM</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderInfo.map((order: any) => (
                            <StyledTableRow key={order._id}>
                                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 650 }}>
                                    {order.user.name}
                                </StyledTableCell>
                                <StyledTableCell>{order.user.phone}</StyledTableCell>
                                <StyledTableCell>
                                    {order.stadium_areas.map((area: any) => (
                                        <Box key={area.stadium_area_ref._id}>
                                            {`${moment(area.start_date).hour()} - ${moment(
                                                area.end_date,
                                            ).hour()}h, ${moment(area.end_date).format('DD/MM/YYYY')} - ${
                                                area.stadium_area_ref.name
                                            }`}
                                        </Box>
                                    ))}
                                </StyledTableCell>
                                <StyledTableCell>{VND.format(order.total_cost)}</StyledTableCell>
                                <StyledTableCell>
                                    {order.status ? (
                                        <TemBox text="Đã thanh toán" color="#33e123" />
                                    ) : (
                                        <TemBox text="Chưa thanh toán" color="#f93f3f" />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {order.payment_method ? (
                                        order.payment_method === 'Cash' ? (
                                            <TemBox text="Tiền mặt" color="#d2df21" />
                                        ) : (
                                            <TemBox text="Stripe" color="#1b83d9" />
                                        )
                                    ) : (
                                        ''
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {moment(order.createAt).format('hh[h]mm, DD/MM/YYYY')}
                                </StyledTableCell>
                                <StyledTableCell>Trống</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default memo(OrderInfos);
