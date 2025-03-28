import { createSignal, onMount } from "solid-js";


export function ToggleDarkMode() {
  const [isDark, setIsDark] = createSignal(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark());
    document.documentElement.classList.toggle("dark", isDark());
  };

  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
}
