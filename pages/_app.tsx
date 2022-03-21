import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { usePreferredTheme } from '@hooks';
import { UIProvider } from '@context/ui';
import { EntriesProvider } from '@context/entries';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = usePreferredTheme();
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
