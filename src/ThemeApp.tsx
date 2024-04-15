import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeAppProps {
    children: React.ReactNode;
}

function ThemeApp({ children }: ThemeAppProps) {
    const [theme, setTheme] = useState(createTheme());

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const muiTheme = createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#f32171',
                }
            },
        });

        setTheme(muiTheme);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default ThemeApp;