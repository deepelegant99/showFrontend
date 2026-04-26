import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const themeOptions = [
  { id: "coastline", label: "Coastline" },
  { id: "ember", label: "Ember" },
  { id: "neon", label: "Neon" },
] as const;

export type ThemeId = (typeof themeOptions)[number]["id"];

type ThemeContextType = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themes: typeof themeOptions;
};

const THEME_STORAGE_KEY = "app-theme";
const DEFAULT_THEME: ThemeId = "coastline";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

const isThemeId = (value: string): value is ThemeId =>
  themeOptions.some((theme) => theme.id === value);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeId>(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme && isThemeId(savedTheme) ? savedTheme : DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
