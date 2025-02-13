import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import type { Project } from "../models/types/project.type";
import type { Placement } from "tippy.js";

const defaultConfig: {
  placement: Placement;
  arrow: boolean;
  animation: string;
  duration: number;
} = {
  placement: "bottom",
  arrow: false,
  animation: "scale",
  duration: 250,
};

export const setLanguageTooltipData = () => {
  const selectedLanguage = document.querySelector("html")?.getAttribute("lang");

  const content = `
        <div class="px-2">
          <div class="flex items-center gap-3 mt-2">
            <div class="rounded-full p-1 bg-primary">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m3 5h12m-6-2v2m1.0482 9.5c-1.52737-1.5822-2.76747-3.4435-3.63633-5.5m6.08813 9h7m-8.5 3 5-10 5 10m-8.2489-16c-.968 5.7702-4.68141 10.6095-9.7511 13.129"
                  stroke="#FFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                />
              </svg>
            </div>
            <div>
              <span class="text-xs font-extralight text-slate-300">
                ${selectedLanguage === "en" ? "Current language" : "Idioma actual"}
              </span>
              <div class="text-base text-white">
                ${selectedLanguage === "en" ? "English" : "Español"}
              </div>
            </div>
          </div>
          <hr class="my-2 border-slate-500" />
          <div class="font-light text-slate-300 mb-2">
            ${selectedLanguage === "en" ? "Press to switch to Spanish" : "Presiona para cambiar a Inglés"}
          </div>
        </div>
      `;

  tippy(`#language-toggle`, {
    ...defaultConfig,
    content,
    allowHTML: true,
    offset: [0, 16],
  });
};

export const setThemeTooltipData = (theme: 'light' | 'dark') => {
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
              ${theme === "light" ? "Claro" : "Oscuro"}
            </div>
          </div>
        </div>
        <hr class="my-2 border-slate-500" />
        <div class="font-light text-slate-300 mb-2">
          ${theme === "light" ? "Presiona para cambiar al modo oscuro" : "Presiona para cambiar al modo claro"}
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

export const setSocialLinksTooltips = () => {
  const buttons = ["Behance", "Dribbble", "GitHub", "LinkedIn"];
  buttons.forEach((title) => {
    tippy(`.social[name="${title}"]`, {
      ...defaultConfig,
      content: title,
    });
  });
};

let cmdTooltip: Instance;
export const showCommandTooltip = (element: HTMLElement) => {
    cmdTooltip = tippy(element, {
      ...defaultConfig,
      allowHTML: true,
      trigger: 'manual',
      sticky: 'reference',
      plugins: [sticky],
      content: `
      <div class="flex items-center whitespace-nowrap">
        Presiona &nbsp; <code class="px-1 bg-slate-600 rounded-sm">Ctrl + M</code> &nbsp; para mostrar u ocultar el menú
      </div>`,
    });

    cmdTooltip.show();
    setTimeout(() => hideCommandTooltip(), 5000);
}

export const hideCommandTooltip = () => {
  cmdTooltip.hide();
}

export const setProjectTechnologiesTooltips = (data: Project[]) => {
  data.forEach((project) => {
    const technologies = document.getElementById(
      `technologies-${project.path}`,
    );
    if (!technologies) return;

    const technologiesList = technologies.getElementsByClassName("technology");
    for (const technology of technologiesList) {
      tippy(technology, {
        ...defaultConfig,
        content: technology.getAttribute("data-tooltip") || "",
      });
    }
  });
};
