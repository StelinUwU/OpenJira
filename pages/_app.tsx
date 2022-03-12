import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { usePreferredTheme } from '@hooks';
import { UIProvider } from '@context/ui';
import { EntriesProvider } from '@context/entries';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = usePreferredTheme();
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp;
