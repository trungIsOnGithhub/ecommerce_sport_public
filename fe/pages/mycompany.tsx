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

const TypographyStyles = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: '60px',
    lineHeight: '55px',
    letterSpacing: '5px',
    color: '#FFFFFF',
    margin: '30px 0',
}));

const BoxPaperStyles = styled(Box)({
    width: '100%',
    textAlign: 'center',
    padding: '3% 5%',
});

const PStyles = styled('p')(({ theme }) => ({
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '25px',
    fontWeight: '700',
    lineHeight: '34px',
    margin: 0,
}));

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
                            <TypographyStyles>SPOTY</TypographyStyles>
                            <Box>
                                <PStyles>Đốt lửa nhiệt huyết - Kết nối đam mê</PStyles>
                                <PStyles>Kiến tạo cộng đồng bóng đá rộng lớn, lành mạnh</PStyles>
                            </Box>
                        </BoxPaperStyles>
                    </PaperContainStyles>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={{ padding: '20px 0' }}>
                        <TypographyTitleStyles>
                            Giới thiệu về <SpanStyles>SPOTY</SpanStyles>
                        </TypographyTitleStyles>
                        <PContentStyles>
                            Mạng xã hội bóng đá dành cho anh em đầu tiên và lớn tại Việt Nam. Ở đây, anh em có thể dễ
                            dàng tìm chỗ chơi, tìm đồng đội hay đối thủ để chơi một cách vui vẻ, công bằng và an toàn
                            nhất.
                        </PContentStyles>
                        <Grid container sx={{ marginTop: '60px' }}>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>2022</BoxNumberStyles>
                                    <PContentStyles>Thành lập</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>0+</BoxNumberStyles>
                                    <PContentStyles>Người dùng</PContentStyles>
                                </BoxMilestonStyles>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <BoxMilestonStyles>
                                    <BoxNumberStyles>0+</BoxNumberStyles>
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
                    <TypographyTitleStyles>Thành viên công ty</TypographyTitleStyles>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <CardMember
                                name="Nguyễn Minh Bảo"
                                title="No pain, no gain"
                                image="https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/122225963_396268598212073_646251198759943111_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=STh8s7dryn0AX9KYTj0&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDPUsFfdmaQW9kJd9_dIz1fcOW6ynuyCj8lPrVgMlhqOQ&oe=648F153E"
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <CardMember
                                name="Nguyễn Trung Phong"
                                title="No pain, no gain"
                                image="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/277815143_2887863068172435_2896726056431508218_n.jpg?stp=c0.122.320.320a_dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ZYAvdSbGjNEAX8EjZtR&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfC_NJzWFZ_M6yZPkRP7yJUU4aPg0tNZMoJH-x1hXWXUQQ&oe=646D3074"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>
                                <SpanStyles>Công ty TNHH SPOTY</SpanStyles>
                            </span>
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Địa chỉ:</span> Kí túc xá khu A, Dĩ An, Bình Dương
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Giấy chứng nhận Đăng ký Kinh doanh:</span>{' '}
                            <Link href="/">Link</Link>
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Thông tin liên hệ:</span> Nguyễn Minh Bảo
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Số điện thoại:</span> 0392747972
                        </PContentStyles>
                        <PContentStyles>
                            <span style={{ color: 'black' }}>Email:</span> bao.nguyen2k1@hcmut.edu.vn
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
