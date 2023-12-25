import { useState } from 'react';
import Menu from '@mui/material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

import { IconSettingStyle } from './menu.styles';
import { MenuUser } from './menu';

export default function MenuUserDrop() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconSettingStyle onClick={handleClick} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SettingsIcon />
            </IconSettingStyle>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuUser />
            </Menu>
        </div>
    );
}

export { MenuUserDrop };
