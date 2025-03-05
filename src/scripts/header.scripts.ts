import { hideCommandTooltip, showCommandTooltip } from "./tooltips.scripts";

const ANIMATION_DURATION = 1000;
const COMMAND_TOOLTIP_SHOWN = { value: false };

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#hero");
  const header = document.getElementById("header");
  let intersectingHeroSection = true;

  if (hero && header) {
    const options = document.getElementsByClassName("option");

    const showOptions = () => {
      hideCommandTooltip();

      const optionsArray = Array.from(options);
      optionsArray.forEach((option) => {
        const optionButton = option.querySelector("button");
        option.setAttribute("style", "transform: translateX(0)");
        option.classList.add("shadow-md");

        setTimeout(() => {
          header.setAttribute("aria-expanded", "true");
          optionButton?.setAttribute("tabindex", "0");
          optionButton?.removeAttribute("aria-hidden");
        }, ANIMATION_DURATION);
      });
    };

    const hideOptions = () => {
      const optionsArray = Array.from(options);
      optionsArray.reverse().forEach((option, index) => {
        const optionButton = option.querySelector("button");
        option.setAttribute(
          "style",
          `transform: translateX(${100 * (index + 1)}px)`,
        );
        option.classList.remove("shadow-md");
        setTimeout(() => {
          header.setAttribute("aria-expanded", "false");
          optionButton?.setAttribute("tabindex", "-1");
          optionButton?.setAttribute("aria-hidden", "true");

          if (COMMAND_TOOLTIP_SHOWN.value === false) {
            COMMAND_TOOLTIP_SHOWN.value = true;
            showCommandTooltip(header);
          }
        }, ANIMATION_DURATION);
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

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      header.addEventListener(
        "click",
        () => {
          const isExpanded = header?.getAttribute("aria-expanded") === "true";
          isExpanded ? hideOptions() : showOptions();
        },
      );
    }

    header.addEventListener(
      "mouseenter",
      () => intersectingHeroSection === false && showOptions(),
    );

    header.addEventListener(
      "mouseleave",
      () => intersectingHeroSection === false && hideOptions(),
    );

    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "m") {
        const isExpanded = header?.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
          hideOptions();
        } else {
          showOptions();
          setTimeout(
            () => document.getElementById("theme-toggle")?.focus(),
            ANIMATION_DURATION,
          );
        }
      }
    });
  }
});
