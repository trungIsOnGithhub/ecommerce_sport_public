import { ReactElement } from 'react';
import { Container } from '@mui/system';
import { styled, Paper, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

import type { NextPageWithLayout } from './_app';
import { HomeLayout } from '../feature/layouts';
import Link from 'next/link';
import imageTitle from '../public/li.jpg';

const SpanStyles = styled('span')(({ theme }) => ({
    fontSize: '27px',
    color: theme.color.lightMain,
}));

const PaperContainStyles = styled(Paper)({
    backgroundImage: `url(${imageTitle.src})`,
    marginTop: '20px',
    backgroundSize: 'contain',
});

// const TypographyStyles = styled(Typography)(({ theme }) => ({
//     fontFamily: 'Nunito',
//     fontWeight: '900',
//     fontSize: '60px',
//     lineHeight: '55px',
//     letterSpacing: '5px',
//     color: '#FFFFFF',
//     margin: '30px 0',
// }));

const BoxPaperStyles = styled(Box)({
    width: '100%',
    textAlign: 'center',
    padding: '3% 5%',
});

// const PStyles = styled('p')(({ theme }) => ({
//     color: '#FFFFFF',
//     fontFamily: 'Nunito',
//     fontSize: '25px',
//     fontWeight: '700',
//     lineHeight: '34px',
//     margin: 0,
// }));

const TypographyTitleStyles = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '700',
    fontSize: '36px',
    lineHeight: '48px',
    color: 'rgba(0, 0, 0, 0.6);',
}));

const PContentStyles = styled('p')({
    fontFamily: 'Nunito',
    fontWeight: '700',
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.6);',
});

const BoxNumberStyles = styled(Box)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '700',
    fontSize: '40px',
    lineHeight: '48px',
    color: theme.color.lightMain,
}));

const BoxMilestonStyles = styled(Box)({
    textAlign: 'center',
});

const CardMember = ({ name, title, image }: any) => {
    return (
        <Card sx={{ maxWidth: 345, marginTop: '40px' }}>
            <CardActionArea>
                <CardMedia component="img" height="200" image={image} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const About: NextPageWithLayout = () => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                       <PaperContainStyles elevation={10}>
                        <BoxPaperStyles>
                            <h1>Tiêu Đề</h1>
                            <Box>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non hendrerit neque.</h3>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non hendrerit neque.</h3>
                            </Box>
                        </BoxPaperStyles>
                    </PaperContainStyles>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={{ padding: '20px 0' }}>
                        <TypographyTitleStyles>
                            Giới thiệu về <SpanStyles>Trang Web</SpanStyles>
                        </TypographyTitleStyles>
                        <PContentStyles>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non hendrerit neque. Sed sagittis, sem congue ultrices fringilla, eros sapien varius augue, ut ultrices odio neque in urna. Morbi tincidunt, libero et euismod tincidunt, leo dui imperdiet quam, quis semper lacus dui sit amet elit. Proin eu eros pretium, efficitur ex sed, pharetra ligula.
                        </PContentStyles>
                        <Grid container sx={{ marginTop: '60px' }}>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>2023</BoxNumberStyles>
                                    <PContentStyles>Thành lập</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>9999999+</BoxNumberStyles>
                                    <PContentStyles>Người dùng</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>9999999+</BoxNumberStyles>
                                    <PContentStyles>Sân bóng</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>2</BoxNumberStyles>
                                    <PContentStyles>Thành viên</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TypographyTitleStyles>Đại diện công ty</TypographyTitleStyles>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <CardMember
                                name="Nguyễn Văn A"
                                title="Người Đại Diện 1"
                                image="https://monngonmoingay.com/wp-content/uploads/2018/06/muc-chien-gion-xot-tac-5.jpg"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <CardMember
                                name="Nguyễn Văn B"
                                title="Người Đại Diện 2"
                                image="https://monngonmoingay.com/wp-content/uploads/2023/11/bun-rieu-cua-5.jpg"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>
                                <SpanStyles>Công ty TNHH: </SpanStyles>
                            </span>
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Địa chỉ:</span> Dĩ An, Bình Dương
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Giấy chứng nhận Đăng ký Kinh doanh:</span>{' '}
                            <Link href="/">Link</Link>
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Thông tin liên hệ:</span> Nguyễn Văn A
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Số điện thoại:</span> 1234567
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Email:</span> trung@trung.com
                        </PContentStyles>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

About.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default About;
