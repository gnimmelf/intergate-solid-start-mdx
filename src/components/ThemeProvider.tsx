import { usePageData } from "./PageDataContext";
import { createContext, useContext, JSX } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { isServer } from "solid-js/web";

const isDark = !isServer
  ? document.documentElement.getAttribute("data-theme") == "dark"
  : false


const [store, setStore] = createStore({
  isDark,
});

const themeData = {
  isDark: () => store.isDark,
  toggleIsDark: () => setStore("isDark", !store.isDark),
};

const ThemeContext = createContext(themeData);

// Create the provider component
export function ThemeProvider(props: { children: JSX.Element }) {
  const pageData = usePageData()
  return (
    <ThemeContext.Provider value={themeData}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useMyStore must be used within a MyStoreProvider");
  }
  return context;
}
