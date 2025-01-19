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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
              fill="#FFFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
              fill="#FFFF"
            />
          </svg>
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
