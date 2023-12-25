import { Box, Paper, Grid, styled } from '@mui/material';
export const BoxContainStyles = styled(Box)({
    width: '90%',
    boxSizing: 'border-box',
    margin: 'auto',
});

export const PaperStyles = styled(Paper)({
    padding: '20px',
    margin: 'auto',
});

export const GridStyles = styled(Grid)({
    textAlign: 'center',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
});
