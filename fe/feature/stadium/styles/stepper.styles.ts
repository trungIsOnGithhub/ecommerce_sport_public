import { StepLabel, Typography, styled } from '@mui/material';

export const TypographySubheadingStyle = styled(Typography)(({ theme }) => ({
    margin: '0px auto 20px',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: theme.color.main,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
}));

export const StyledStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-label': {
        fontSize: 'large',
    },
    '& .Mui-active': {
        color: 'green',
    },
});
