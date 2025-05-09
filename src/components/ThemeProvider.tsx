import { createContext, useContext, JSXElement } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { isServer } from "solid-js/web";
import { DEFAULT_THEME, THEMES } from "~/constants";

const [store, setStore] = createStore({
  currentTheme: DEFAULT_THEME,
});

const themeData = {
  currentTheme: () => store.currentTheme,
  toggleTheme: () => {
    if (!isServer) {
      const prev = store.currentTheme;
      const next = prev == THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

      document.documentElement.setAttribute("data-theme", next);
      setStore("currentTheme", next);
    }
  },
};

const ThemeContext = createContext(themeData);

// Create the provider component
export function ThemeProvider(props: { children: JSXElement }) {
  return (
    <ThemeContext.Provider value={themeData}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
