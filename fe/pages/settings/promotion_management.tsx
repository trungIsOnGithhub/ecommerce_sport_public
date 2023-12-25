import { ReactElement } from 'react';
import { ButtonStyle } from '../../components/button';
import { BoxContainStyles } from '../../components/boxcontain';

import type { NextPageWithLayout } from '../_app';
import { SettingsLayout } from '../../feature/layouts';
import withAuth from '../../store/withAuth';
import Banner from '../../components/banner';
import { Paper, styled } from '@mui/material';
import bannerBG from '../../public/li.jpg';
import saleImg from '../../public/li.jpg';
import scoreImg from '../../public/li.jpg';
import voucherImg from '../../public/li.jpg';
import moment from 'moment';
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
// Discount Card
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import BusinessIcon from '@mui/icons-material/Business';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const DiscountCard = ({ data }: { data: any }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: '20px',
                margin: '20px auto',
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4} m={'auto'}>
                    <Img alt="complex" src={saleImg.src} />
                </Grid>
                <Grid item xs={8} container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <TypographyHeading2Style>Khuyến mãi Tri ân khách hàng</TypographyHeading2Style>
                            <Typography variant="body2" gutterBottom>
                                <QueryBuilderIcon />
                                <b> Thời gian áp dụng:</b> {data.startDate} - {data.endDate}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <BusinessIcon />
                                <b> Địa điểm:</b> {data.address}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <LoyaltyIcon />
                                <b> Mức giảm giá:</b> {data.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                Sed malesuada lobortis pretium.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonStyle variant="contained" sx={{ float: 'right' }}>
                                Dùng ngay
                            </ButtonStyle>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const ScoreCard = ({ data }: { data: any }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: '20px',
                margin: '20px auto',
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4} m={'auto'}>
                    <Img alt="complex" src={scoreImg.src} />
                </Grid>
                <Grid item xs={8} container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <TypographyHeading2Style>Tích điểm giờ vàng</TypographyHeading2Style>
                            <Typography variant="body2" gutterBottom>
                                <QueryBuilderIcon />
                                <b> Thời gian áp dụng:</b> {data.startDate} - {data.endDate}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <BusinessIcon />
                                <b> Địa điểm:</b> {data.address}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <LoyaltyIcon />
                                <b> Quy đổi:</b> {data.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                Sed malesuada lobortis pretium.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonStyle variant="contained" sx={{ float: 'right' }}>
                                Dùng ngay
                            </ButtonStyle>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const VoucherCard = ({ data }: { data: any }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: '20px',
                margin: '20px auto',
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4} m={'auto'}>
                    <Img alt="complex" src={voucherImg.src} />
                </Grid>
                <Grid item xs={8} container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <TypographyHeading2Style>Voucher ưu đãi</TypographyHeading2Style>
                            <Typography variant="body2" gutterBottom>
                                <QueryBuilderIcon />
                                <b> Thời gian áp dụng:</b> {data.startDate} - {data.endDate}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <BusinessIcon />
                                <b> Địa điểm:</b> {data.address}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <LoyaltyIcon />
                                <b> Mức giảm giá:</b> {data.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                Sed malesuada lobortis pretium.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonStyle variant="contained" sx={{ float: 'right' }}>
                                Dùng ngay
                            </ButtonStyle>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const User: NextPageWithLayout = () => {
    const data = {
        discount: {
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(7, 'days').format('DD/MM/YYYY'),
            address: 'Sân Gò Vấp',
            value: '20%',
        },
        score: {
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(7, 'days').format('DD/MM/YYYY'),
            address: 'Sân KTX khu A',
            value: '10000 VND - 1 điểm',
        },
        voucher: {
            startDate: moment().format('DD/MM/YYYY'),
            endDate: moment().add(7, 'days').format('DD/MM/YYYY'),
            address: 'Sân KTX khu A',
            value: '10000 VND',
        },
    };
    return (
        <BoxContainStyles>
            <Banner title={''} imageBG={bannerBG} />
            <DiscountCard data={data['discount']} />
            <ScoreCard data={data['score']} />
            <VoucherCard data={data['voucher']} />
        </BoxContainStyles>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return <SettingsLayout>{page}</SettingsLayout>;
};
// export default User;
export default withAuth(User);
