import { createContext, useContext, JSX } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { isServer } from "solid-js/web";

const isDark = isServer
  ? false
  : document.documentElement.getAttribute("data-theme") == "dark";

// Create the theme initially to infer its type
const [theme, setTheme] = createStore({
  isDark,
});

const themeData = {
  isDark: () => theme.isDark,
  toggleIsDark: () => setTheme("isDark", !theme.isDark),
};

// Create context with inferred type
const ThemeContext = createContext<typeof themeData | undefined>(undefined);

// Create the provider component
export function ThemeProvider(props: { children: JSX.Element }) {
  return (
    <ThemeContext.Provider value={themeData}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useMyStore must be used within a MyStoreProvider");
  }
  return context;
}
