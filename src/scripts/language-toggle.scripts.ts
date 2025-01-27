import { setLanguageTooltipData } from "./tooltips.scripts";

const changeLanguage = () => {
  const spanishFlag = document.querySelector("#spanish-flag");
  spanishFlag?.classList.add("animate-duration-500");

  const html = document.querySelector("html");
  const selectedLanguage = html?.getAttribute("lang");

  if (selectedLanguage === "en") {
    spanishFlag?.classList.remove("hidden");
  } else {
    spanishFlag?.classList.add("animate-reverse");
  }
  spanishFlag?.classList.add("animate-fade");

  const ANIMATION_DURATION = 500;
  setTimeout(() => {
    location.pathname = selectedLanguage === "en" ? "/es" : "/en";
  }, ANIMATION_DURATION);
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#language-toggle")
    ?.addEventListener("click", changeLanguage);

  setLanguageTooltipData();
});
