import * as React from 'react';
import { ReactElement } from 'react';

import { Box, IconButton, MenuItem, Modal, Paper, SelectChangeEvent, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import { SelectField } from '../../components/select';
import stadiumService from '../../services/stadiumService';
import orderService from '../../services/orderService';
import moment from 'moment';
import { OrderDelete, OrderEdit } from '../../feature/orderManagement';
import PaginationCustom from '../../components/pagination';
import { TextFieldStyle } from '../../components/textField';
import { VND } from '../../utils/helper';

const NUMBER_OF_PAGES = 10;

import { TypographyHeading2Style } from '../../components/typographyHeading';

const BoxFormControlStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0.6',
    gap: 10,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
    },
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
    const [stadiums, setStadiums] = React.useState([]);
    const [areas, setAreas] = React.useState([]);
    const [stdCurr, setStdCurr] = React.useState('');
    const [areaCurr, setAreaCurr] = React.useState('');
    const [orderCurr, setOrderCurr] = React.useState();
    const [openModal, setOpenModal] = React.useState(false);
    const [modalCurr, setModalCurr] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const [query, setQuery] = React.useState({
        page: 1,
        search: '',
    });

    React.useEffect(() => {
        const getStadiums = async () => {
            const stadiums = await stadiumService.getStadiumOfOwner();
            const stdData = stadiums.data.data.stadiums;
            if (stdData.length === 0) return;
            setStadiums(stadiums.data.data.stadiums);
            setStdCurr(stadiums.data.data.stadiums[0]._id);
        };
        getStadiums();
    }, []);

    React.useEffect(() => {
        const getAreas = async () => {
            const areas = await stadiumService.getAllStadiumAreas(stdCurr);
            const areaData = areas.data.data.areas;
            if (areaData.length === 0) return;
            setAreas(areas.data.data.areas);
            setAreaCurr(areas.data.data.areas[0]?._id);
        };
        if (stdCurr) getAreas();
    }, [stdCurr]);

    React.useEffect(() => {
        if (!areaCurr) return;
        const getOrderByArea = async () => {
            const res = await orderService.getOrdersByArea(areaCurr, { page: query.page, search: query.search });
            setOrders(res.data.orders);
            setCount(res.data.count);
        };
        getOrderByArea();
    }, [areaCurr, query.page, query.search]);

    const handleChangeStd = (e: SelectChangeEvent<unknown>) => {
        setStdCurr(e.target.value as string);
        setAreas([]);
        setAreaCurr('');
    };

    const handleChangeArea = (e: SelectChangeEvent<unknown>) => {
        setAreaCurr(e.target.value as string);
    };
    const handleCloseModal = React.useCallback(() => setOpenModal(false), []);
    const handleShowModal = (orderId: string, type: string) => {
        setOpenModal(true);
        setModalCurr(type);
        const order = orders.find((e: any) => e._id === orderId);
        setOrderCurr(order);
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const changePageOrder = (param: any, { page }: any) => {
        setQuery({ ...query, page });
    };

    const handleSearchSubmit = () => {
        setQuery({ ...query, page: 1, search: searchText });
    };

    return (
        <Box sx={{ paddingRight: '20px' }}>
            <TypographyHeading2Style>Quản lí đơn đặt sân</TypographyHeading2Style>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <BoxFormControlStyle sx={{ width: '500px', margin: '20px' }}>
                    <SelectField name="Sân chính" value={stdCurr} handleChange={handleChangeStd}>
                        {stadiums.map((stadium: any) => (
                            <MenuItem key={stadium._id} value={stadium._id}>
                                {stadium.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <SelectField name="Sân con" value={areaCurr} handleChange={handleChangeArea}>
                        {areas.map((area: any) => (
                            <MenuItem key={area._id} value={area._id}>
                                {area.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                </BoxFormControlStyle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextFieldStyle
                        label="Tìm kiếm"
                        variant="outlined"
                        placeholder="Nhập SDT hoặc tên"
                        value={searchText}
                        onChange={handleChangeSearch}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                handleSearchSubmit();
                            }
                        }}
                    />
                    <IconButton onClick={handleSearchSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <TableContainer component={Paper}>
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
                            <StyledTableCell
                                sx={{
                                    position: 'sticky',
                                    right: 0,
                                }}
                            >
                                Chỉnh sửa
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: any) => (
                            <StyledTableRow key={order._id}>
                                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 650 }}>
                                    {order.user.name}
                                </StyledTableCell>
                                <StyledTableCell>{order.user.phone}</StyledTableCell>
                                <StyledTableCell>
                                    {order.stadium_areas.map((area: any) => (
                                        <Box key={`${area.stadium_area_ref._id}${Math.random()}`}>
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
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        position: 'sticky',
                                        right: 0,
                                        backgroundColor: 'inherit',
                                    }}
                                >
                                    <Box sx={{ borderLeft: '2px solid #cbcbcb' }}>
                                        <IconButton
                                            sx={{ color: 'green' }}
                                            onClick={() => handleShowModal(order._id, 'EDIT')}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: 'red' }}
                                            onClick={() => handleShowModal(order._id, 'DELETE')}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    {modalCurr === 'EDIT' ? (
                        <OrderEdit orderCurr={orderCurr} setOrders={setOrders} />
                    ) : (
                        <OrderDelete orderCurr={orderCurr} setOrders={setOrders} handleCloseModal={handleCloseModal} />
                    )}
                </>
            </Modal>
            <PaginationCustom count={Math.ceil(count / NUMBER_OF_PAGES)} handleSubmit={changePageOrder} />
        </Box>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
