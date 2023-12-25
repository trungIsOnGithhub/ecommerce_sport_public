import { Typography, styled, Paper } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const TypographyHeading1Style = styled(Typography)(({ theme }) => ({
    left: '0px',
    top: '50px',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 30,
    letterSpacing: '0.04em',
    color: theme.color.lightMain,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textTransform: 'uppercase',
}));

export const TypographyHeading2Style = styled(Typography)(({ theme, color }) => ({
    left: '0px',
    top: '50px',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: ' rgba(0, 0, 0, 0.6)',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textTransform: 'uppercase',
}));

export const Diversity3IconStyle = styled(Diversity3Icon)(({ theme }) => ({
    color: theme.color.lightMain,
}));

export const CalendarMonthIconStyle = styled(CalendarMonthIcon)(({ theme }) => ({
    color: theme.color.lightMain,
}));

export const PaperStyle = styled(Paper)({
    padding: 20,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
});
