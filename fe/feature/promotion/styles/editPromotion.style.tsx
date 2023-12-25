import { Paper, Box, styled } from '@mui/material';

export const PaperStyle = styled(Paper)(({ theme }) => ({
    padding: '20px',
    height: '500px',
    margin: '20px auto',
    overflowY: 'scroll',
    position: 'relative',
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '800px',
    },
}));

export const BoxTabsStyles = styled(Box)({
    width: '100%',
});

export const BoxStyles = styled(Box)({
    marginTop: '15px',
    width: '300px',
    paddingRight: '20px',
});

export const BoxButtonStyles = styled(Box)({
    display: 'flex',
    justifyContent: 'end',
    marginTop: '20px',
});
