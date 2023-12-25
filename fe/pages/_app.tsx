import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider, ThemeProviderStyles } from '../store';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <ThemeProviderStyles>
            <AuthContextProvider>{getLayout(<Component {...pageProps} />)}</AuthContextProvider>
        </ThemeProviderStyles>
    );
}

export default MyApp;
