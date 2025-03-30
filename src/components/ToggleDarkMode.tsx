import { createSignal, onMount } from "solid-js";
import { useTheme } from "./Theme";


export function ToggleDarkMode() {
  const theme = useTheme()

  const toggleDarkMode = () => {
    theme.toggleIsDark()
    document.documentElement.setAttribute("data-theme", theme.isDark() ? 'dark' : '')
  };

  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
}
