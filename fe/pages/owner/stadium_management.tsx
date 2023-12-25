import * as React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem, Modal, Tooltip, styled } from '@mui/material';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import { useEffect, useState } from 'react';
import stadiumService from '../../services/stadiumService';
import {
    AreaCreate,
    AreaDelete,
    AreaDetail,
    AreaEdit,
    StadiumCreate,
    StadiumDelete,
    StadiumDetail,
    StadiumEdit,
} from '../../feature/stadiumManage';
import { createContext } from 'react';
import { ButtonStyle } from '../../components/button';
import { VND } from '../../utils/helper';

const TYPEMODAL = {
    DetailStd: 'DetailStd',
    EditStd: 'EditStd',
    DeleteStd: 'DeleteStd',
    DetailArea: 'DetailArea',
    EditArea: 'EditArea',
    DeleteArea: 'DeleteArea',
    CreateArea: 'CreateArea',
};

export const TableCellStyle = styled(TableCell)({
    fontSize: '16px',
    fontWeight: '700',
    textAlign: 'center',
});
export const TableCellDataStyle = styled(TableCell)({
    padding: '5px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: '250px',
});
export const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
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

// Create context
export const RowsContext = createContext<{
    state: any;
    dispatch: React.Dispatch<React.SetStateAction<any>>;
}>({
    state: {},
    dispatch: () => null,
});

function ChildTable(props: { id: any }) {
    const { id } = props;
    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [typeModal, setTypeModal] = React.useState<string>('');
    const [rowCurr, setRowCurr] = React.useState<any>({ stadium: id });

    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        const getAllStadiumAreas = async () => {
            const ares = await stadiumService.getAllStadiumAreas(id);
            setRows(ares.data.data.areas);
        };
        getAllStadiumAreas();
    }, [id]);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
        setAnchorEl(event.currentTarget);
        setRowCurr(row);
    };
    const handleCloseModal = () => setOpenModal(false);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleOpenModal = (id: string) => {
        setOpenModal(true);
        setTypeModal(id);
    };
    const projectTypeModal = (id: string, dataArea: any, setDataArea: any, handleCloseModal: any) => {
        switch (id) {
            case TYPEMODAL.DetailArea:
                return <AreaDetail data={dataArea} setDataArea={setDataArea} />;
            case TYPEMODAL.CreateArea:
                return <AreaCreate data={dataArea} setDataArea={setDataArea} />;
            case TYPEMODAL.EditArea:
                return <AreaEdit data={dataArea} setDataArea={setDataArea} />;
            case TYPEMODAL.DeleteArea:
                return <AreaDelete data={dataArea} setDataArea={setDataArea} handleCloseModal={handleCloseModal} />;
            default:
                return <>ERROR</>;
        }
    };
    return (
        <Box sx={{ margin: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    Sân con
                </Typography>
                <ButtonStyle variant="contained" size="small" onClick={() => handleOpenModal('CreateArea')}>
                    Tạo sân con
                </ButtonStyle>
            </Box>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCellStyle>Tên</TableCellStyle>
                        <TableCellStyle>Kích thước</TableCellStyle>
                        <TableCellStyle>Số lượng</TableCellStyle>
                        <TableCellStyle>Thời gian và giá</TableCellStyle>
                        <TableCellStyle />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row._id}>
                            <TableCellDataStyle component="th" scope="row">
                                {row.name}
                            </TableCellDataStyle>
                            <TableCellDataStyle>{row.size}</TableCellDataStyle>
                            <TableCellDataStyle>{row.quantity}</TableCellDataStyle>
                            <TableCellDataStyle sx={{ maxWidth: '100px' }}>
                                {row.time_price.reduce(function (curr: any, tp: any) {
                                    return curr + `${tp.from}-${tp.to}h: ${VND.format(tp.price)}; `;
                                }, '')}
                            </TableCellDataStyle>
                            <TableCellDataStyle>
                                <IconButton onClick={(e: any) => handleClickMenu(e, row)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                    <MenuItem onClick={() => handleOpenModal('DetailArea')}>
                                        <InfoIcon color="info" />
                                        Xem chi tiết
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal('EditArea')}>
                                        <EditIcon color="success" />
                                        Chỉnh sửa
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal('DeleteArea')}>
                                        <DeleteIcon color="error" />
                                        Xóa
                                    </MenuItem>
                                </Menu>
                            </TableCellDataStyle>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>{projectTypeModal(typeModal, rowCurr, setRows, handleCloseModal)}</>
            </Modal>
        </Box>
    );
}

function Row(props: { rowParent: any; index: number }) {
    const [row, setRow] = useState(props.rowParent);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [typeModal, setTypeModal] = React.useState<string>('');

    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleOpenModal = (id: string) => {
        setOpenModal(true);
        setTypeModal(id);
    };
    const handleCloseModal = () => setOpenModal(false);
    const projectTypeModal = (id: string, dataStd: any, setDataStd: any, handleCloseModal: any) => {
        switch (id) {
            case TYPEMODAL.DetailStd:
                return <StadiumDetail data={dataStd} setDataStd={setRow} />;
            case TYPEMODAL.EditStd:
                return <StadiumEdit data={dataStd} setDataStd={setRow} />;
            case TYPEMODAL.DeleteStd:
                return <StadiumDelete data={dataStd} setDataStd={setRow} handleCloseModal={handleCloseModal} />;
            default:
                return <>ERROR</>;
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: '#f6fffb' }}>
                <TableCellDataStyle>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{
                            backgroundColor: 'rgb(104, 234, 104)',
                            ['&:hover']: { backgroundColor: (theme) => theme.color.lightMain },
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCellDataStyle>
                <TableCellDataStyle component="th" scope="row">
                    <strong>{props.index}</strong>
                </TableCellDataStyle>
                <TableCellDataStyle>{row.name}</TableCellDataStyle>
                <TableCellDataStyle>{row.contact}</TableCellDataStyle>
                <TableCellDataStyle>{`${row.time_open}h - ${row.time_close}h`}</TableCellDataStyle>
                <TableCellDataStyle>
                    <Tooltip
                        title={`${row.location.address}, ${row.location.ward.name}, ${row.location.district.name}, ${row.location.province.name}`}
                    >
                        <Box>{row.location.address}</Box>
                    </Tooltip>
                </TableCellDataStyle>
                <TableCellDataStyle>
                    <IconButton onClick={handleClickMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => handleOpenModal('DetailStd')}>
                            <InfoIcon color="info" />
                            Xem chi tiết
                        </MenuItem>
                        <MenuItem onClick={() => handleOpenModal('EditStd')}>
                            <EditIcon color="success" />
                            Chỉnh sửa
                        </MenuItem>
                        <MenuItem onClick={() => handleOpenModal('DeleteStd')}>
                            <DeleteIcon color="error" />
                            Xóa
                        </MenuItem>
                    </Menu>
                </TableCellDataStyle>
            </TableRow>
            <TableRow>
                <TableCellStyle style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ChildTable id={row._id} />
                    </Collapse>
                </TableCellStyle>
            </TableRow>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>{projectTypeModal(typeModal, row, setRow, handleCloseModal)}</>
            </Modal>
        </React.Fragment>
    );
}

const User: NextPageWithLayout = () => {
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = React.useState(false);

    useEffect(() => {
        const getStadiumsOfOwner = async () => {
            const stadiums = await stadiumService.getStadiumOfOwner();
            setRows(stadiums.data.data.stadiums);
        };
        getStadiumsOfOwner();
    }, []);

    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <RowsContext.Provider value={{ state: rows, dispatch: setRows }}>
            <TypographyHeading2Style>Sân bóng của tôi</TypographyHeading2Style>
            <Box sx={{ textAlign: 'end', padding: '0 10px 10px 0' }}>
                <ButtonStyle variant="contained" onClick={handleOpenModal}>
                    Tạo sân mới
                </ButtonStyle>
            </Box>
            <Box sx={{ padding: '0 10px 0 0' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#dafbe8' }}>
                                <TableCellStyle />
                                <TableCellStyle>STT</TableCellStyle>
                                <TableCellStyle>Tên sân</TableCellStyle>
                                <TableCellStyle>Liên hệ</TableCellStyle>
                                <TableCellStyle>Giờ mở - đóng</TableCellStyle>
                                <TableCellStyle>Địa chỉ</TableCellStyle>
                                <TableCellStyle />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any, index: number) => (
                                <Row key={row._id} rowParent={row} index={index + 1} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title-1"
                aria-describedby="modal-modal-description-1"
            >
                <>
                    <StadiumCreate />
                </>
            </Modal>
        </RowsContext.Provider>
    );
};

User.getLayout = function getLayout(page: React.ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User, 'own', 'admin');
