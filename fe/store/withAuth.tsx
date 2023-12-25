import { useContext } from 'react';

import { AuthContext } from './authContext';
import Login from '../pages/auth/login';
import { NextPageWithLayout } from '../pages/_app';
import BackdropCustom from '../components/backdrop';

const withAuth = (Component: NextPageWithLayout, ...params: any[]) => {
    const Auth: NextPageWithLayout = (props: any) => {
        const { state } = useContext(AuthContext);

        if (!state.isLoginIn) return <BackdropCustom />;
        if (params.length !== 0) {
            if (!params.includes(state.role)) return <>You are not a stadium owner</>;
        }
        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    if (Component.getLayout) {
        Auth.getLayout = Component.getLayout;
    }

    return Auth;
};
export default withAuth;
