import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '@themes';
export const usePreferredTheme = () => {
  const [preferredTheme, setPreferredTheme] = useState(darkTheme);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setPreferredTheme(darkTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setPreferredTheme(lightTheme);
    } else {
      setPreferredTheme(darkTheme);
    }
  }, []);

  return preferredTheme;
};
