export type Theme = 'dark' | 'light';

export interface IThemeContext {
  theme: Theme;
  handleTheme: (newTheme?: Theme) => void;
}
