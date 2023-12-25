import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ChildrenProps {
    children: React.ReactNode;
}

const themeColors = {
    color: {
        main: `#009357`,
        lightMain: 'RGB(73, 182, 73)',
        bg: '#fcfcfc',
        textLight: '#fff',
        darkGreen: '#064635',
    },
} as const;

type CustomTheme = {
    [Key in keyof typeof themeColors]: typeof themeColors[Key];
};
declare module '@mui/material/styles/createTheme' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}

const theme = createTheme({
    typography: {
        fontFamily: `"Nunito", "Roboto", "Helvetica", "Arial", sans-serif`,
        fontSize: 14,
        h4: {
            fontWeight: 400,
            fontSize: 34,
        },
        h3: {
            fontWeight: 900,
            fontSize: 40,
        },
    },
    ...themeColors,
});

const ThemeProviderStyles = ({ children }: ChildrenProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderStyles;
