import { styled, Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { LocationOn, PhoneEnabled, Sell } from '@mui/icons-material';
export const BoxStyle = styled(Box)(() => ({
    display: 'flex',
    padding: '2px 0px',
}));
export const CardStyle = styled(Card)(() => ({
    position: 'relative',
    width: '100%',
    height: '360px',
    minHeight: '330px',
    overflow: 'hidden',
}));
export const TypographyStyle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.color.main,
    fontSize: '18px',
}));
export const TypographyContentStyle = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    width: '220px',
    fontSize: '13px',
    marginLeft: '8px',
}));
export const LocationOnIcon = styled(LocationOn)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '15px',
}));
export const PhoneEnabledIcon = styled(PhoneEnabled)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '15px',
}));
export const SellIcon = styled(Sell)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '15px',
}));

export const Discount = styled('span')(({ theme }) => ({
    width: '150px',
    height: '25px',
    top: '10px',
    right: '-50px',
    position: 'absolute',
    display: 'block',
    background: '#FF0000',
    fontSize: '15px',
    color: 'white',
    textAlign: 'center',
    transform: 'rotate(45deg)',
    WebkitTransform: 'rotate(45deg)',
    msTransform: 'rotate(45deg)',
}));
