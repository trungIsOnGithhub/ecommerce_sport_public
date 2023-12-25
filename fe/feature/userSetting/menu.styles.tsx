import styled from '@emotion/styled';
import { ListItemText, ListItemIcon, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Title = styled('h3')({
    marginTop: '10px',
    paddingLeft: '20px',
    marginBottom: '0',
    color: '#064635',
});
export const ListItemIconStyle = styled(ListItemIcon)({
    minWidth: '0',
});
export const ListItemTextStyle = styled(ListItemText)({
    textAlign: 'start',
    marginLeft: '25px',
    color: '#064635',
});
export const IconButtonStyle = styled(IconButton)({
    marginRight: 'auto',
});

export const MenuIconStyle = styled(MenuIcon)({ color: 'white' });

export const IconSettingStyle = styled(IconButton)({
    marginLeft: '10px',
    color: 'black',
});
