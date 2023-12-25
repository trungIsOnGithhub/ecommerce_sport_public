import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import { ButtonWhiteStyle } from '../../../components/button';

export const ContainerStyle = styled(Container)({
    display: 'flex',
    position: 'sticky',
    alignItems: 'center',
    backgroundColor: '#009357',
    height: '64px',
    boxShadow: '0px 4px 4px 0px #00000040',
});

export const BoxNavStyle = styled(Box)({
    marginLeft: '50px',
});
export const ButtonNavStyle = styled(Button)({
    marginLeft: '10px',
    fontSize: '15px',
    color: 'white',
    display: 'block',
    textTransform: 'none',
});

export const ButtonRegisterStyle = styled(Button)({
    marginRight: '10px',
    color: 'white',
    borderColor: 'white',
});

export const ButtonSigninStyle = styled(ButtonWhiteStyle)({});
export const BoxAuthStyle = styled(Box)({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
});
