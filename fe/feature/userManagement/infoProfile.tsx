import { Box, Grid } from '@mui/material';
import { GridStyles } from './styles';
import { TypographyHeading2Style } from '../../components/typographyHeading';
import { AvatarInfo } from './changePassword';
import { ChangeInformation } from './changeInformation';
export const InfoProfile = () => {
    return (
        <Box>
            <TypographyHeading2Style>Thông tin cá nhân</TypographyHeading2Style>
            <Grid container spacing={2}>
                <GridStyles item md={5}>
                    <AvatarInfo />
                </GridStyles>
                <Grid item md={7}>
                    <ChangeInformation />
                </Grid>
            </Grid>
        </Box>
    );
};
