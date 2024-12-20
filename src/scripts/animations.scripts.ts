type GradientSections = "skills" | "contact";
const SECOND = 1000;

const translateGradientFigures = (sectionId: GradientSections) => {
  const container = document.getElementById(`${sectionId}-gradient`);

  if (!container) return;

  const getTranslation = (axis: "x" | "y") => {
    const TRANSLATE_MULTIPLIER = 1.25;
    const RANDOM_OFFSET = Math.ceil(Math.random() * 10);
    const MAX_AXIS_TRANSLATION =
      container[axis === "x" ? "offsetWidth" : "offsetHeight"];
    const translation =
      (MAX_AXIS_TRANSLATION * TRANSLATE_MULTIPLIER) / RANDOM_OFFSET;
    return (RANDOM_OFFSET > 5 ? translation : -translation) + "px";
  };

  const gradientCircles = container.getElementsByClassName("gradient-circle");
  for (const circle of gradientCircles) {
    setTimeout(() => {
      circle.setAttribute(
        "style",
        `transform: translateX(${getTranslation("x")}) translateY(${getTranslation("y")})`,
      );
    }, SECOND);
  }
};

let animationRunning = false;
const initGradientsBackgroundAnimations = () => {
  if (animationRunning) return;
  animationRunning = true;

  const sections: GradientSections[] = ["skills", "contact"];
  for (const section of sections) {
    translateGradientFigures(section);
  }

  setTimeout(() => {
    animationRunning = false;
    requestAnimationFrame(initGradientsBackgroundAnimations);
  }, SECOND * 10);
};

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    `(prefers-reduced-motion: reduce)`,
  ).matches;

  if (reducedMotion) return;

  initGradientsBackgroundAnimations();
});
