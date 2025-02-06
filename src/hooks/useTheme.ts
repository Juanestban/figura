import { useContext } from 'react';

import { ThemeContext } from 'figura/contexts/ThemeProvider';

export const useTheme = () => {
  const themeHook = useContext(ThemeContext);

  if (!themeHook) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }

  return themeHook;
};
