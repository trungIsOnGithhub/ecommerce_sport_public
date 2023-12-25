import { styled, Paper } from '@mui/material';
export const PaperDeleteStyle = styled(Paper)(({ theme }) => ({
    padding: 20,
    margin: '30px auto',
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '500px',
    },
}));
