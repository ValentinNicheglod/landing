import { setThemeTooltipData } from "./tooltips.scripts";

const STORAGE_KEY = "theme-preference";

const handleThemeToggleClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  setThemePreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(STORAGE_KEY)) {
    return localStorage.getItem(STORAGE_KEY);
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
};

const setThemePreference = () => {
  localStorage.setItem(STORAGE_KEY, theme.value || "");
  reflectThemePreference();
};

const reflectThemePreference = () => {
  document.firstElementChild?.setAttribute("data-theme", theme.value || "");
  setThemeTooltipData(theme.value);
};

const theme: {
  value: 'light' | 'dark'
} = {
  value: getColorPreference() as 'light' | 'dark',
};

reflectThemePreference();

window.onload = () => {
  reflectThemePreference();

  document
    .querySelector("#theme-toggle")
    ?.addEventListener("click", handleThemeToggleClick);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setThemePreference();
  });
