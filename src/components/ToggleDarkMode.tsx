import { CgDarkMode } from 'solid-icons/cg'
import { useTheme } from "./ThemeProvider";


export function ToggleDarkMode() {
  const theme = useTheme()

  const toggleDarkMode = () => {
    theme.toggleIsDark()
    document.documentElement.setAttribute("data-theme", theme.isDark() ? 'dark' : '')
  };

  return <button onClick={toggleDarkMode}><CgDarkMode size={44}/></button>;
}
