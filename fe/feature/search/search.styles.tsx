import { styled, Box, IconButton } from '@mui/material';

export const BoxContainStyle = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
}));
export const BoxContentStyle = styled(Box)(({ theme }) => ({
    margin: 'auto',
    borderRadius: '100px',
    width: '90%',
    backgroundColor: 'white',
    padding: '10px 30px 10px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
        borderRadius: '20px',
        flexDirection: 'column',
        width: '100%',
    },
}));

export const BoxFormControlStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginLeft: '10px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        marginTop: '10px',
    },
}));

export const IconButtonStyle = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: '95%',
        marginTop: '20px',
        borderRadius: '10px',
    },
}));
