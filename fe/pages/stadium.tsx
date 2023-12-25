import { ReactElement, useEffect, useState, useContext, createContext } from 'react';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { Modal, Grid, Box, List } from '@mui/material';

import Stepper from '../feature/stadium/stepper';
import PriceTable from '../feature/stadium/priceTable';
import Voucher from '../feature/stadium/voucherTable';
import StadiumService from '../services/stadiumService';
import ImageSlider from '../components/imageslider';
import ListItemCustom from '../components/listItem';
import { HomeLayout } from '../feature/layouts';
import { AuthContext } from '../store';
import { ShowDetail } from '../feature/stadium';
import {
    TypographyHeadingStyle,
    LocationOnIconStyle,
    AlarmIconStyle,
    ContactIconStyle,
    FollowButtonStyle,
    GrassIconStyle,
    PromoteButonStyle,
    PaperContainStyle,
} from '../feature/stadium/styles';

import type { IStadium, IArea } from '../feature/stadium/interfaces';
import type { NextPageWithLayout } from './_app';

interface IStdContext {
    name?: string;
    std?: IStadium;
    areas?: IArea[];
}

export const StdContext = createContext<{
    state: IStdContext;
}>({
    state: {},
});

const Detail: NextPageWithLayout = () => {
    const route = useRouter();
    const { state } = useContext(AuthContext);

    const [stdData, setStdData] = useState<IStadium>({});
    const [stdAreaData, setStdAreaData] = useState<IArea[]>([]);

    useEffect(() => {
        if (route.isReady) {
            const slug = route.query.slug ? (route.query.slug as string) : '';
            const fetchStdData = async () => {
                const resStd = await StadiumService.getStadiumDetail(slug);
                setStdData(resStd.data.data.stadium[0] as IStadium);
                const resArea = await StadiumService.getAllStadiumAreas(resStd.data.data.stadium[0]._id);
                setStdAreaData(resArea.data.data.areas as IArea[]);
            };
            fetchStdData();
        }
    }, [route.isReady, route.query.slug]);

    const [openPrice, setOpenPrice] = useState(false);
    const handleOpenPrice = () => setOpenPrice(true);
    const handleClosePrice = () => setOpenPrice(false);

    const [openVoucher, setOpenVoucher] = useState(false);
    const handleOpenVoucher = () => setOpenVoucher(true);
    const handleCloseVoucher = () => setOpenVoucher(false);
    return (
        <Container>
            <PaperContainStyle elevation={5}>
                <Grid container spacing={{ xs: 2, lg: 5 }}>
                    <Grid item md={5} alignItems="flex-start">
                        <ImageSlider
                            avatar={stdData.avatar ? stdData.avatar : ''}
                            data={stdData.images ? stdData.images : []}
                        />
                    </Grid>
                    <Grid item md={7}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TypographyHeadingStyle gutterBottom align="center">
                                    {stdData.name}
                                </TypographyHeadingStyle>
                                <List>
                                    <ListItemCustom
                                        icon={<LocationOnIconStyle />}
                                        title="Địa chỉ:"
                                        content={` ${stdData.location?.address}, ${stdData.location?.ward.name}, ${stdData.location?.district.name}, ${stdData.location?.province.name} `}
                                    />
                                    <ListItemCustom
                                        icon={<ContactIconStyle />}
                                        title="Liên hệ"
                                        content={
                                            state.isLoginIn ? ` ${stdData.contact} ` : ' Đăng nhập để xem số điện thoại'
                                        }
                                    />
                                    <ListItemCustom
                                        icon={<AlarmIconStyle />}
                                        title="Thời gian hoạt động:"
                                        content={` ${stdData.time_open} - ${stdData.time_close}h`}
                                    />
                                    <ListItemCustom
                                        icon={<GrassIconStyle />}
                                        title="Chất liệu sân:"
                                        content=" Cỏ nhân tạo"
                                    />
                                    <ShowDetail stdAreaData={stdAreaData} />
                                </List>
                            </Grid>

                            <Grid container direction="row" alignItems="center" spacing={5} justifyContent="center">
                                {/* <Grid item xs="auto">
                                    <FollowButtonStyle disabled variant="contained">
                                        theo dõi
                                    </FollowButtonStyle>
                                </Grid> */}
                                <Grid item xs="auto">
                                    <FollowButtonStyle variant="contained" onClick={handleOpenPrice}>
                                        bảng giá
                                    </FollowButtonStyle>
                                    <Modal
                                        open={openPrice}
                                        onClose={handleClosePrice}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <>
                                            <PriceTable data={stdAreaData} />
                                        </>
                                    </Modal>
                                </Grid>
                                <Grid item xs="auto">
                                    <PromoteButonStyle variant="contained" onClick={handleOpenVoucher}>
                                        ưu đãi
                                    </PromoteButonStyle>
                                    <Modal
                                        open={openVoucher}
                                        onClose={handleCloseVoucher}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <>
                                            <Voucher data={stdData} />
                                        </>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <StdContext.Provider value={{ state: { std: stdData, areas: stdAreaData } }}>
                    <Stepper />
                </StdContext.Provider>
            </PaperContainStyle>
        </Container>
    );
};

Detail.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};

export default Detail;
