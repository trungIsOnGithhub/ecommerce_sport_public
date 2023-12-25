import { useContext, useState } from 'react';
import { Drawer } from '@mui/material';

import { MenuIconStyle, IconButtonStyle } from './menu.styles';
import { MenuOwner, MenuUser } from './menu';
import { AuthContext } from '../../store';

interface Props {
    window?: () => Window;
}
const MenuUserDrawer = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { state } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <IconButtonStyle sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleDrawerToggle}>
                <MenuIconStyle />
            </IconButtonStyle>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={() => handleDrawerToggle()}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 300,
                    },
                }}
            >
                {state.role === 'user' ? <MenuUser /> : <MenuOwner />}
            </Drawer>
        </>
    );
};

export { MenuUserDrawer };
