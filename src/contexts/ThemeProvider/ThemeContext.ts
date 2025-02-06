import { createContext } from 'react';

import type { IThemeContext } from 'figura/models';
import { DEFAULT_THEME } from 'figura/config/constants';
import { noop } from 'figura/utils/noop';

export const ThemeContext = createContext<IThemeContext>({
  theme: DEFAULT_THEME,
  handleTheme: noop,
});
