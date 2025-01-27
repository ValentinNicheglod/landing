document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#hero");
  let intersectingHeroSection = true;

  if (hero) {
    const header = document.getElementById("header");
    const options = document.getElementsByClassName("option");

    const showOptions = () => {
      const optionsArray = Array.from(options);
      optionsArray.forEach((option) => {
        option.setAttribute("style", "transform: translateX(0)");
        option.classList.add("shadow-md");
      });
    };

    const hideOptions = () => {
      const optionsArray = Array.from(options);
      optionsArray.reverse().forEach((option, index) => {
        option.setAttribute(
          "style",
          `transform: translateX(${100 * (index + 1)}px)`,
        );
        option.classList.remove("shadow-md");
      });
    };

    const observe = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (intersectingHeroSection === false) {
              intersectingHeroSection = true;
              showOptions();
            }
          } else {
            if (intersectingHeroSection === true) {
              intersectingHeroSection = false;
              hideOptions();
            }
          }
        });
      });

      observer.observe(hero);
    };

    document.addEventListener("scroll", observe);

    header?.addEventListener(
      "mouseenter",
      () => intersectingHeroSection === false && showOptions(),
    );
    header?.addEventListener(
      "mouseleave",
      () => intersectingHeroSection === false && hideOptions(),
    );
  }
});
