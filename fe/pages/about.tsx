import { ReactElement } from 'react';
import { Container } from '@mui/system';
import { styled, Paper, Typography, Box, Grid } from '@mui/material';

import type { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import { ButtonStyle } from '../components/button';
import { AdvertisingCart } from '../feature/advertisingCart';
import serviceTips from '/public/li.jpg';
import userImage from '/public/li.jpg';
import teamImage from '/public/li.jpg';
import fieldImage from '/public/li.jpg';
import orderImage from '/public/li.jpg';
import promotionImage from '/public/li.jpg';
import { AdvertisingAboutUs } from '../feature/advertisingCart/advertisingCart';
import girlSpoty from '../public/li.jpg';
import boySpoty from '../public/li.jpg';
import titleImage from '../public/li.jpg';

const PaperContainStyles = styled(Paper)({
    backgroundImage: `url(${titleImage.src})`,
    backgroundSize: 'contain',
    marginTop: '20px',
});

const TypographyStyles = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: '40px',
    lineHeight: '55px',
    letterSpacing: '5px',
    color: '#FFFFFF',
    width: '70%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        fontSize: '20px',
        lineHeight: '30px',
    },
}));

const BoxPaperStyles = styled(Box)({
    padding: '3% 5%',
});

const BoxContainStyles = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));

const PStyles = styled('p')(({ theme }) => ({
    color: theme.color.textLight,
    width: '30%',
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: 'Nunito',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

const SpanStyles = styled('span')(({ theme }) => ({
    color: theme.color.lightMain,
}));

const TypographyQuestionStyles = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: '40px',
    lineHeight: '55px',
    color: 'black',
    width: '100%',
    [theme.breakpoints.down('md')]: {},
}));

const BoxQAStyles = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: '30px',
}));

const PAnswerStyles = styled('p')(({ theme }) => ({
    width: '100%',
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: 'Nunito',
    color: 'rgba(0,0,0,0.5)',
}));

const About: NextPageWithLayout = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <PaperContainStyles elevation={10}>
                        <BoxPaperStyles>
                            <TypographyStyles>
                                VỀ <SpanStyles>SPOTY</SpanStyles> TÌM KIẾM SÂN BÓNG MỘT CÁCH DỄ DÀNG TIỆN LỢI
                            </TypographyStyles>
                            <BoxContainStyles>
                                <PStyles>
                                    Đặt sân, tạo câu lạc bộ riêng, cáp kèo hay tìm đối nhanh chóng dễ dàng.
                                </PStyles>
                                <Box>
                                    <ButtonStyle variant="contained" href="https://zalo.me/0392747972">
                                        Liên hệ
                                    </ButtonStyle>
                                </Box>
                            </BoxContainStyles>
                        </BoxPaperStyles>
                    </PaperContainStyles>
                </Grid>
                <Grid item sm={12} md={12}>
                    <BoxQAStyles>
                        <TypographyQuestionStyles>
                            <SpanStyles>SPOTY</SpanStyles> có liên quan gì đến bạn ?
                        </TypographyQuestionStyles>
                        <PAnswerStyles>
                            SPOTY sẽ khiến cho việc quản lý ứng dụng đặt sân bóng đá dễ dàng và tiện lợi hơn bao giờ
                            hết, cùng với đó SPOTY sẽ giúp tăng nhu cầu của khách hàng về sân thể thao giúp cho việc
                            tăng nhu cầu sử dụng, đặt trước và tạo sự thích thú cho khách hàng, khuyến khích khách hàng
                            sử dụng nhiều hơn.
                        </PAnswerStyles>
                    </BoxQAStyles>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Thông tin sân gần vị trí của bạn nhất, đặt sân online, tiện lợi, dễ dàng."
                        image={serviceTips}
                        title="Tìm kiếm và đặt sân"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Thông tin đặt sân, hóa đơn và tất cả thông tin cá nhân sẽ được quản lí bởi chính bạn"
                        image={userImage}
                        title="Quản lý thông tin"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Người chơi sẽ có thể tạo một đội bóng riêng cho mình, quản lí đội cũng như cáp kèo với nhau."
                        image={teamImage}
                        title="Tạo đội và cáp kèo"
                    />
                </Grid>
                <Grid item sm={12} md={12}>
                    <BoxQAStyles>
                        <TypographyQuestionStyles>
                            <SpanStyles>SPOTY</SpanStyles> liên quan gì đến chủ sân ?
                        </TypographyQuestionStyles>
                        <PAnswerStyles>
                            Phần mềm quản lý sân bóng của Sporta hỗ trợ chủ sân quản lý lịch đặt sân hiệu quả và chuyên
                            nghiệp hơn. Ở đó chủ sân có thể biết được một ngày sân có bao nhiêu lịch, lịch đặt ở sân
                            nào, giờ nào? Giờ nào còn sân trống một cách nhanh chóng, dễ dàng.
                        </PAnswerStyles>
                    </BoxQAStyles>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Thông tin sân bóng sẽ được quản lí như thêm sửa xóa một các dễ dàng."
                        image={fieldImage}
                        title="Quản lí sân bóng"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Thông tin lịch đặt sân sẽ được hiện thị một cách rõ ràng cùng với hóa đơn"
                        image={orderImage}
                        title="Quản lí lịch đặt sân và hóa đơn"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AdvertisingCart
                        content="Chủ sân có thể tạo các chương trình khuyến mãi như voucher, giảm giá,..."
                        image={promotionImage}
                        title="Chương trình khuyến mãi"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <AdvertisingAboutUs
                        image={girlSpoty}
                        title="Khách hàng của chúng tôi nói gì?"
                        content="Bạn muốn thuê sân? Thông tin sân gần vị trí của bạn nhất, đặt sân online, tiện lợi, dễ dàng."
                        buttonName="Đặt ngay"
                        link="/"
                        reverse={false}
                    />
                    <AdvertisingAboutUs
                        image={boySpoty}
                        title="Hợp tác với SPOTY"
                        content="Bạn là chủ sân? Bạn muốn quản lý sân của mình một cách thông minh. Bạn muốn quản lý các dịch vụ tiện ích tại sân. SPOTY sẽ giúp bạn cải thiện hiệu suất quản lý, tăng doanh thu của sân bóng"
                        buttonName="Đăng kí chủ sân"
                        link="https://zalo.me/"
                        reverse={true}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

About.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default About;
