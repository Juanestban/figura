import { useContext } from 'react';

import { DrawerContext } from 'figura/contexts/DrawerProvider';

export const useDrawer = () => {
  const drawerHook = useContext(DrawerContext);

  if (!drawerHook) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }

  return drawerHook;
};
