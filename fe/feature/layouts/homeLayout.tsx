import { Grid } from '@mui/material';

import Header from './header';

interface ChildrenProps {
    children: React.ReactNode;
}

const HomeLayout = ({ children }: ChildrenProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Header />
            </Grid>

            <Grid item xs={12} md={12}>
                {children}
            </Grid>
        </Grid>
    );
};

export default HomeLayout;
