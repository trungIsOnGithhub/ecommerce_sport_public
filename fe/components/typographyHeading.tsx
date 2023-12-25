import { styled, Typography } from '@mui/material';

const HeadingStyle = styled(Typography)(({ theme, color }) => ({
    margin: '20px auto',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: 25,
    letterSpacing: '0.04em',
    color: theme.color.main,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
}));

export const TypographyHeading2Style = ({ children }: any) => {
    return <HeadingStyle>{children}</HeadingStyle>;
};
