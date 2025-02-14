import { isProduction } from "../models/constants";

/** If user navigator language is Spanish the page will be initialized in that language instead of English */
export const initializeLanguage = () => {
  const notLanguagePreferenceSaved = !sessionStorage.getItem("lang");
  if (notLanguagePreferenceSaved) {
    const navigatorLanguageIsSpanish = navigator.language.includes("es");
    if (navigatorLanguageIsSpanish) {
      location.pathname = "/es";
      sessionStorage.setItem("lang", "es");
    }
  }
};

/** Show page content when animation loading finished */
export const showContent = () => {
  const LOADER_DURATION = isProduction ? 3000 : 0;
  const content = document.getElementById("content");
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    content?.classList.remove("hidden");
    loader.remove();
  }, LOADER_DURATION);
};

export const removeLoader = () => {
  const wrapper = document.querySelector(".wrapper");
  const image = document.querySelector(".logo");
  setTimeout(() => {
    wrapper?.classList.remove("scale-150");
    wrapper?.classList.add("scale-0");
    image?.classList.add(
      "animate-jump-out",
      "animate-duration-[2000ms]",
      "animate-ease-out",
      "animate-delay-500",
      "opacity-0",
    );
  }, 1000);
};
