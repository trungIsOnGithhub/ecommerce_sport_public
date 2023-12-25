import { styled, Box, Typography } from '@mui/material';
import { StaticImageData } from 'next/image';

interface ImageProps {
    image: StaticImageData;
    reverse: boolean;
}

export const BoxAdvertisingCart = styled(Box)({
    width: '100%',
    height: '300px',
});

export const BoxContainAdvertisingCart = styled(Box)({
    textAlign: 'center',
    padding: '10px',
});

export const TypographyTitleCart = styled(Typography)({
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '41px',
    color: 'rgba(0, 0, 0, 0.5)',
});

export const TypographyContentCart = styled(Typography)({
    padding: '0 60px',
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    color: 'rgba(0, 0, 0, 0.5)',
});

export const BoxContainAboutUs = styled(Box)<ImageProps>(({ theme, image, reverse }) => ({
    backgroundImage: `url(${image.src})`,
    height: '400px',
    width: '100%',
    backgroundSize: '50% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: reverse ? 'left' : 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: reverse ? 'end' : 'start',
    [theme.breakpoints.down('md')]: {
        backgroundSize: '100% 100%',
    },
}));

export const BoxDivideAboutUs = styled(Box)(({ theme }) => ({
    backgroundColor: theme.color.lightMain,
    width: '100px',
    height: '3px',
}));

export const BoxTitleAboutUs = styled(Typography)(({ theme }) => ({
    fontSize: '40px',
    fontFamily: 'Nunito',
    fontWeight: '900',
    lineHeight: '55px',
}));

export const BoxContentAboutUs = styled(Box)(({ theme }) => ({
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'rgba(0, 0, 0, 0.5)',
    width: '50%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));
