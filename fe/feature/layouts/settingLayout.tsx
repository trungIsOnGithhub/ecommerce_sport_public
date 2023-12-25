import { Grid } from '@mui/material';
import { useContext } from 'react';

import { AuthContext } from '../../store';
import { MenuUser, MenuOwner } from '../userSetting';
import Header from './header';

interface ChildrenProps {
    children: React.ReactNode;
}

const SettingsLayout = ({ children }: ChildrenProps) => {
    const { state } = useContext(AuthContext);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Header />
            </Grid>

            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                {state.role === 'user' ? <MenuUser /> : <MenuOwner />}
            </Grid>
            <Grid item xs={12} md={9}>
                {children}
            </Grid>
        </Grid>
    );
};

export default SettingsLayout;
