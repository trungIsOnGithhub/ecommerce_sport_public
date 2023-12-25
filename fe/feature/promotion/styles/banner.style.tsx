import { styled, Typography, Paper } from '@mui/material';

export const TypographyHeading1Style = styled(Typography)(({ theme }) => ({
    margin: 'auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 30,
    letterSpacing: '0.04em',
    color: theme.color.textLight,
    textTransform: 'uppercase',
    justifyContent: 'center',
    textAlign: 'center',
}));
export const BannerContainStyles = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: '24px',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '30px auto',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    marginTop: '20px',
    height: '300px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        height: '500px',
    },
}));
