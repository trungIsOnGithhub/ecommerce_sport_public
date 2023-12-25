import { styled, Box, Paper, TableCell, TableRow, tableCellClasses } from '@mui/material';
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.color.darkGreen,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export const PaperStyles = styled(Paper)({
    padding: '20px',
    margin: '20px auto',
    flexGrow: 1,
});

export const PaperStyle = styled(Paper)(({ theme }) => ({
    padding: '20px',
    margin: '30px auto',
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '500px',
    },
}));

export const PaperContainStyles = styled(Paper)(({ theme }) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: '24px',
    padding: '20px',
    overflowY: 'scroll',
    height: '500px',
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '500px',
    },
}));
export const BoxStyles = styled(Box)(({ theme }) => ({
    margin: '20px',
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '500px',
    },
}));
