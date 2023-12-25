import { createContext, ReactElement, useCallback, useEffect, useState } from 'react';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import { Box, MenuItem, Modal, SelectChangeEvent, styled, Typography } from '@mui/material';
import { OrderInfos, OrderSchedule } from '../../feature/orderScheduler';
import { SelectField } from '../../components/select';
import { ButtonStyle } from '../../components/button';
import stadiumService from '../../services/stadiumService';
import orderService from '../../services/orderService';

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

export const AreaContext = createContext<{
    state: any;
    dispatch?: React.Dispatch<React.SetStateAction<any>>;
}>({
    state: {},
    dispatch: () => null,
});

const User: NextPageWithLayout = () => {
    const [stadiums, setStadiums] = useState([]);
    const [areas, setAreas] = useState([]);
    const [stdCurr, setStdCurr] = useState('');
    const [areaCurr, setAreaCurr] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        const getStadiums = async () => {
            const stadiums = await stadiumService.getStadiumOfOwner();
            const stdData = stadiums.data.data.stadiums;
            if (stdData.length === 0) return;
            setStadiums(stadiums.data.data.stadiums);
            setStdCurr(stadiums.data.data.stadiums[0]._id);
        };
        getStadiums();
    }, []);

    useEffect(() => {
        const getAreas = async () => {
            const areas = await stadiumService.getAllStadiumAreas(stdCurr);
            const areaData = areas.data.data.areas;
            if (areaData.length === 0) return;
            setAreas(areas.data.data.areas);
            setAreaCurr(areas.data.data.areas[0]?._id);
        };
        if (stdCurr) getAreas();
    }, [stdCurr]);

    const handleChangeStd = (e: SelectChangeEvent<unknown>) => {
        setStdCurr(e.target.value as string);
        setAreas([]);
        setAreaCurr('');
    };

    const handleChangeArea = (e: SelectChangeEvent<unknown>) => {
        setAreaCurr(e.target.value as string);
    };

    const handleCloseModal = useCallback(() => setOpenModal(false), []);
    const handleShowOrder = useCallback((orderIds: any[]) => {
        setOpenModal(true);
        const getOrderByIds = async () => {
            const res = await orderService.getOrderByIds(orderIds);
            setOrderInfo(res.data.data);
        };
        getOrderByIds();
    }, []);

    return (
        <Box sx={{ paddingRight: '30px' }}>
            <TypographyHeading2Style>Quản lí lịch đặt sân</TypographyHeading2Style>
            <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <BoxFormControlStyle>
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
            </Box>
            <AreaContext.Provider value={{ state: areas.find((e: any) => (e._id = areaCurr)) }}>
                <OrderSchedule area={areaCurr} handleShowOrder={handleShowOrder} />
            </AreaContext.Provider>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <OrderInfos orderInfo={orderInfo} />
                </>
            </Modal>
        </Box>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
