// Theme

export type PrefersColorScheme = "dark" | "light";
export type Theme = "system" | "dark" | "light";
export type Themes = {
  icon: JSX.Element;
  name: string;
  value: Theme;
};
export type UserAgent = typeof window.navigator.userAgent;
export type Set = {
  prefersColorScheme?: PrefersColorScheme;
  theme?: Theme;
  userAgent?: UserAgent;
};
export type GetThemeReturn = {
  className: PrefersColorScheme;
  name: "theme";
  value: Theme;
};
