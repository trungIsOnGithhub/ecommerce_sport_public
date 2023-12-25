import { LocationOn, Grass, Call, Description } from '@mui/icons-material';
import { styled, Typography, Button, Paper } from '@mui/material';

export const TypographyHeadingStyle = styled(Typography)(({ theme }) => ({
    fontSize: '40px',
    fontWeight: 800,
    lineHeight: '55px',
    letterSpacing: '0em',
    color: theme.color.darkGreen,
}));

export const LocationOnIconStyle = styled(LocationOn)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '20px',
}));

export const GrassIconStyle = styled(Grass)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '20px',
}));
export const ContactIconStyle = styled(Call)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '20px',
}));
export const AlarmIconStyle = styled(Description)(({ theme }) => ({
    color: theme.color.main,
    fontSize: '20px',
}));
export const FollowButtonStyle = styled(Button)(({ theme }) => ({
    width: '150px',
    backgroundColor: theme.color.main,
    '&:hover': {
        backgroundColor: theme.color.main,
    },
}));

export const PromoteButonStyle = styled(Button)(({ theme }) => ({
    width: '150px',
    backgroundColor: '#F0BB62',
    '&:hover': {
        backgroundColor: '#F0BB62',
    },
}));

export const PaperContainStyle = styled(Paper)({
    padding: '20px',
    margin: 'auto',
    maxWidth: '1326px',
    flexGrow: '10px',
    borderRadius: '4px',
});
