import { type PropsWithChildren, useState, useEffect } from 'react';

import type { Theme } from 'figura/models';
import { DEFAULT_THEME } from 'figura/config/constants';
import { ThemeContext } from './ThemeContext';

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    const finalTheme = (localStorage.getItem('figura-theme') ?? DEFAULT_THEME) as Theme;
    document.body.dataset.theme = finalTheme;

    return finalTheme;
  });

  const handleTheme = (newTheme?: Theme) => {
    setTheme((prevTheme) => {
      const finalTheme = newTheme ?? (prevTheme === 'light' ? 'light' : 'dark');
      document.body.dataset.theme = finalTheme;

      return finalTheme;
    });
  };

  useEffect(() => {}, []);

  return <ThemeContext.Provider value={{ theme, handleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
