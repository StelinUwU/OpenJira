import { darkTheme, lightTheme } from '@themes';
export const preferredTheme = () => {
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const userPrefersLight =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;

  console.log('userPrefersDark', userPrefersDark);
  console.log('userPrefersLight', userPrefersLight);

  if (userPrefersDark) {
    return darkTheme;
  } else if (userPrefersLight) {
    return lightTheme;
  } else {
    return darkTheme;
  }
};
