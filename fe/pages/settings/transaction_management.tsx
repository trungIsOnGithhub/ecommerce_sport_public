import * as React from 'react';
import { ReactElement } from 'react';

import { Box, Paper, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import orderService from '../../services/orderService';
import moment from 'moment';
import PaginationCustom from '../../components/pagination';
import { VND } from '../../utils/helper';

const NUMBER_OF_PAGES = 10;

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
const User: NextPageWithLayout = () => {
    const [orders, setOrders] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [query, setQuery] = React.useState({
        page: 1,
    });

    React.useEffect(() => {
        const getOrderByUser = async () => {
            const res = await orderService.getOrderByUser({ page: query.page });
            setOrders(res.data.orders);
            setCount(res.data.count);
        };
        getOrderByUser();
    }, [query.page]);

    const changePageOrder = (param: any, { page }: any) => {
        setQuery({ ...query, page });
    };

    return (
        <Box sx={{ paddingRight: '20px' }}>
            <TypographyHeading2Style>Lịch sử giao dịch</TypographyHeading2Style>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{ tableLayout: 'auto' }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Thời gian đặt - Loại sân</StyledTableCell>
                            <StyledTableCell>Tổng tiền</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                            <StyledTableCell>PTTT</StyledTableCell>
                            <StyledTableCell>Ngày tạo</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: any) => (
                            <StyledTableRow key={order._id}>
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
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationCustom count={Math.ceil(count / NUMBER_OF_PAGES)} handleSubmit={changePageOrder} />
        </Box>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
