import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

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
  setTooltipData();
};

const setTooltipData = () => {
  const content = `
    <div class="px-2">
      <div class="flex items-center gap-3 mt-2">
        <div class="rounded-full p-1 bg-primary">
          <img src="src/icons/theme.svg" class="w-6 h-6" />
        </div>
        <div>
          <span class="text-xs font-extralight text-slate-300">
            Tema actual
          </span>
          <div class="text-base text-white">
            ${theme.value === "light" ? "Claro" : "Oscuro"}
          </div>
        </div>
      </div>
      <hr class="my-2 border-slate-500" />
      <div class="font-light text-slate-300 mb-2">
        ${theme.value === "light" ? "Presiona para cambiar al modo oscuro" : "Presiona para cambiar al modo claro"}
      </div>
    </div>
  `;

  tippy(`#theme-toggle`, {
    content,
    allowHTML: true,
    placement: "bottom",
    arrow: false,
    animation: "scale",
    offset: [0, 16],
    duration: 250,
  });
};

const theme = {
  value: getColorPreference(),
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
