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
}

/** Show page content when animation loading finished */
export const showContent = () => {
  const LOADER_DURATION = 3000;
  const content = document.getElementById("content");

  setTimeout(() => {
    content?.classList.remove("hidden");
  }, LOADER_DURATION);
}