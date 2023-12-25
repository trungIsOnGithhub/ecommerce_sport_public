import { LoadingButton } from '@mui/lab';
import { IconButton, styled } from '@mui/material';

export const ButtonStyle = styled(LoadingButton)(({ theme }) => ({
    backgroundColor: theme.color.main,
    ['&:hover']: {
        backgroundColor: theme.color.lightMain,
    },
}));

export const ButtonWhiteStyle = styled(LoadingButton)(({ theme }) => ({
    color: theme.color.main,
    backgroundColor: 'white',
    ['&:hover']: {
        backgroundColor: 'white',
    },
}));

export const IconButtonStyle = styled(IconButton)(({ theme }) => ({
    position: 'relative',
    right: '-15px',
    backgroundColor: theme.color.main,
    ['&:hover']: {
        backgroundColor: theme.color.lightMain,
    },
    [theme.breakpoints.down('md')]: {
        marginTop: '10px',
        right: '0',
        width: '95%',
        borderRadius: '10px',
    },
}));
