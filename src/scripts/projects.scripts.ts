// Swiper
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";

// Data
import { projectsData } from "../data/projects.data";

// Types & Enums
import { ProjectFilters } from "../models/enums/filters.enum";
import type { SwiperOptions } from "swiper/types";
import type { SwiperSlide } from "swiper/element";
import type { Project, ProjectNames } from "../models/types/project.type";

// Scripts
import {
  changeButtonState,
  translateIndicator,
} from "./filters.scripts";
import {
  setProjectTechnologiesTooltips,
  setProjectTypeTooltips,
} from "./tooltips.scripts";

// Translations
import projectsTranslations from "../locales/projects.locales.json";

const getProjectsGallerySwiperConfig = (project: Project) => {
  const options: SwiperOptions = {
    slidesPerView: 1,
    centeredSlides: true,
    keyboard: true,
    navigation:
      project.galleryImages.length > 1
        ? {
            nextEl: `#${project.path}-next`,
            prevEl: `#${project.path}-prev`,
          }
        : false,
    modules: [Navigation],
  };
  return options;
};

const getProjectsListSwiperConfig = () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  allowAutoplay = !prefersReducedMotion;
  const options: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    watchSlidesProgress: true,
    autoplay: allowAutoplay
      ? {
          pauseOnMouseEnter: true,
        }
      : false,
    breakpoints: getProjectsListBreakpoints(),
    modules: [Autoplay],
  };
  return options;
};

type SlidesPerViewBreakpoints = Record<number, { slidesPerView: number }>;

const getProjectsListBreakpoints = (): SlidesPerViewBreakpoints => {
  return {
    704: {
      slidesPerView: 1.25,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.5,
    },
    1218: {
      slidesPerView: 3,
    },
  };
};

const initializeProjectsGallerySwiper = () => {
  projectsData.forEach((project) => {
    const projectGallery = document.getElementById(
      `${project.path}-gallery-swiper`,
    );

    if (!projectGallery) return;

    const swiper = new Swiper(
      projectGallery,
      getProjectsGallerySwiperConfig(project),
    );

    const firstSlidePrototypeContent = projectGallery
      ?.querySelector(`[data-slide="0"]`)
      ?.querySelector(".prototype-content");
    firstSlidePrototypeContent?.setAttribute("tabindex", "0");

    swiper.on("beforeSlideChangeStart", () => {
      const prototypeContent = projectGallery
        ?.querySelector(`[data-slide="${swiper.activeIndex}"]`)
        ?.querySelector(".prototype-content");
      prototypeContent?.removeAttribute("tabindex");
    });

    swiper.on("activeIndexChange", () => {
      const prototypeContent = projectGallery
        ?.querySelector(`[data-slide="${swiper.activeIndex}"]`)
        ?.querySelector(".prototype-content");
      prototypeContent?.setAttribute("tabindex", "0");
    });
  });
};

let projectSwiper: Swiper | null = null;
let mobilePrevButton: HTMLElement | null = null;
let mobileNextButton: HTMLElement | null = null;
let projectsIndicator: HTMLElement | null = null;
let allowAutoplay = false;
let isGalleryOpen = false;
let lastInputWasKeyboard = false;
let lastGalleryCard: HTMLElement | null = null;
let galleryOpenedWithKeyboard = false;

const suppressProjectHover = () => {
  document.body.classList.add("suppress-project-hover");

  const clearSuppression = () => {
    document.body.classList.remove("suppress-project-hover");
  };

  document.addEventListener("pointermove", clearSuppression, { once: true });
  document.addEventListener("keydown", clearSuppression, { once: true });
};

const initializeProjectsSwiper = () => {
  projectSwiper = new Swiper("#projects-swiper", getProjectsListSwiperConfig());
};

const addProjectCardButtonsListeners = () => {
  const viewMoreButtons = document.querySelectorAll<HTMLButtonElement>(
    ".view-more",
  );
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest<HTMLElement>(".project-card");
      const projectId = card?.dataset.project as ProjectNames | undefined;
      if (!projectId) return;
      handleViewMoreClick(projectId);
    });
  });

  const openGalleryButtons = document.querySelectorAll<HTMLElement>(
    '[id$="-gallery-button"]',
  );
  openGalleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest<HTMLElement>(".project-card");
      const projectId = card?.dataset.project as ProjectNames | undefined;
      if (!projectId) return;
      openGalleryModal(projectId, button);
    });
  });

  const closeGalleryButtons = document.querySelectorAll<HTMLElement>(
    '[id$="-gallery-close-button"]',
  );
  closeGalleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.id.replace(
        /-gallery-close-button$/,
        "",
      ) as ProjectNames;
      closeGalleryModal(projectId);
    });
  });
};

const addFiltersListeners = () => {
  const filters = document.getElementById("projects-filter");

  if (filters) {
    for (const filter of filters.children) {
      filter.addEventListener("click", () => handleFilter(filter));
    }

    handleFilter(filters.children[0]);
  }
};

let lastGalleryTrigger: HTMLElement | null = null;

const openGalleryModal = (projectPath: string, trigger?: HTMLElement) => {
  const dialog = document.getElementById(
    `${projectPath}-gallery`,
  ) as HTMLDialogElement;
  const closeButton = document.getElementById(
    `${projectPath}-gallery-close-button`,
  ) as HTMLElement | null;

  lastGalleryTrigger = trigger ?? null;
  lastGalleryCard = trigger?.closest(".project-card") as HTMLElement | null;
  galleryOpenedWithKeyboard = lastInputWasKeyboard;

  projectSwiper?.disable();
  isGalleryOpen = true;
  setProjectsAutoplay(false);
  if (galleryOpenedWithKeyboard) {
    lastGalleryCard?.classList.add("is-expanded");
  }

  dialog?.showModal();
  dialog?.addEventListener(
    "close",
    () => {
      projectSwiper?.enable();
      isGalleryOpen = false;
      lastGalleryCard?.classList.remove("is-expanded");
      lastGalleryCard = null;
      if (galleryOpenedWithKeyboard) {
        lastGalleryTrigger?.focus();
      } else {
        lastGalleryTrigger?.blur();
        suppressProjectHover();
      }
      galleryOpenedWithKeyboard = false;
    },
    { once: true },
  );

  closeButton?.focus();
};

const closeGalleryModal = (projectPath: string) => {
  const ANIMATION_DURATION = 700;
  const galleryModal = document.getElementById(
    `${projectPath}-gallery`,
  ) as HTMLDialogElement;

  galleryModal.classList.add("closing");

  setTimeout(() => {
    galleryModal.classList.remove("closing");
    galleryModal.close();
  }, ANIMATION_DURATION);
};

let selectedFilterIndex: ProjectFilters = ProjectFilters.ALL;
const handleFilter = (filter: Element) => {
  const selectedIndex = filter.attributes.getNamedItem("data-value")?.value;

  if (selectedIndex) {
    selectedFilterIndex = parseInt(selectedIndex);
    changeButtonState(
      `project-filter-${selectedFilterIndex}`,
      "projects-filter",
    );
    translateIndicator("projects-filter-indicator", selectedFilterIndex);
    setProjectSlides();
  }
};

const setProjectSlides = () => {
  const projectSlides = document.querySelectorAll(
    ".project-slide",
  ) as unknown as SwiperSlide[];

  projectSlides.forEach((slide) => {
    if (!slide.dataset.type) return;

    const projectType: ProjectFilters = parseInt(slide.dataset.type);
    if (
      selectedFilterIndex === ProjectFilters.ALL ||
      projectType === selectedFilterIndex
    ) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  projectSwiper?.slideTo(0, 0);
  projectSwiper?.update();
  updateMobileNavVisibility();
  updateProjectSlidesFocusability();
};


const getCurrentSlidesPerView = () => {
  let slidesPerView = 1.1;
  const breakpoints = getProjectsListBreakpoints();
  const width = window.innerWidth;
  const sizes = Object.keys(breakpoints)
    .map((size) => parseInt(size))
    .sort((a, b) => a - b);

  for (const size of sizes) {
    if (width >= size) {
      slidesPerView = breakpoints[size].slidesPerView;
    }
  }

  return slidesPerView;
};

const getVisibleProjectsCount = () => {
  if (selectedFilterIndex === ProjectFilters.ALL) {
    return projectsData.length;
  }

  return projectsData.filter((project) => project.type === selectedFilterIndex)
    .length;
};

const getVisibleSlideIndices = () => {
  const slides = Array.from(
    document.querySelectorAll(".project-slide"),
  ) as HTMLElement[];

  return slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => slide.style.display !== "none")
    .map(({ index }) => index);
};

const updateProjectsIndicator = () => {
  if (!projectsIndicator || !projectSwiper) return;

  const visibleIndices = getVisibleSlideIndices();
  const total = visibleIndices.length;

  projectsIndicator.innerHTML = "";

  if (total <= 1) return;

  const activeIndex = visibleIndices.indexOf(projectSwiper.realIndex);
  const activePosition = activeIndex >= 0 ? activeIndex : 0;

  for (let i = 0; i < total; i += 1) {
    const dot = document.createElement("span");
    if (i === activePosition) dot.classList.add("is-active");
    projectsIndicator.appendChild(dot);
  }
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]",
].join(",");

const setSlideFocusability = (slide: HTMLElement, isFocusable: boolean) => {
  const focusables = slide.querySelectorAll<HTMLElement>(focusableSelector);

  focusables.forEach((element) => {
    if (isFocusable) {
      const original = element.getAttribute("data-orig-tabindex");
      if (original === null) return;
      if (original === "none") {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", original);
      }
      element.removeAttribute("data-orig-tabindex");
      return;
    }

    if (!element.hasAttribute("data-orig-tabindex")) {
      const current = element.getAttribute("tabindex");
      element.setAttribute("data-orig-tabindex", current ?? "none");
    }
    element.setAttribute("tabindex", "-1");
  });

  slide.setAttribute("aria-hidden", isFocusable ? "false" : "true");
  if (isFocusable) {
    slide.removeAttribute("inert");
  } else {
    slide.setAttribute("inert", "");
  }
};

const updateProjectSlidesFocusability = () => {
  const slides = Array.from(
    document.querySelectorAll(".project-slide"),
  ) as HTMLElement[];

  const visibleSlides = new Set(
    (projectSwiper
      ? (projectSwiper as unknown as { visibleSlides?: HTMLElement[] })
          .visibleSlides
      : undefined) ?? [],
  );

  slides.forEach((slide) => {
    const isDisplayed = slide.style.display !== "none";
    const isVisible = isDisplayed
      && (visibleSlides.size > 0 ? visibleSlides.has(slide) : true);
    setSlideFocusability(slide, isVisible);
  });
};

const setProjectsAutoplay = (shouldRun: boolean) => {
  if (!projectSwiper?.autoplay) return;

  if (!shouldRun) {
    projectSwiper.autoplay.stop();
    return;
  }

  if (!allowAutoplay) return;

  if (projectSwiper.params.autoplay === false) {
    projectSwiper.params.autoplay = { pauseOnMouseEnter: true };
  }
  projectSwiper.autoplay.start();
};

const addProjectsAutoplayGuards = () => {
  const swiperEl = document.getElementById("projects-swiper");
  if (!swiperEl) return;

  swiperEl.addEventListener("focusin", () => setProjectsAutoplay(false));
  swiperEl.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (isGalleryOpen) return;
      if (!swiperEl.contains(document.activeElement)) {
        setProjectsAutoplay(true);
      }
    }, 0);
  });
};

const updateMobileNavVisibility = () => {
  const mobileNav = document.getElementById("projects-nav");
  if (!mobileNav || !projectsIndicator) return;

  const visibleProjects = getVisibleProjectsCount();
  const slidesPerView = getCurrentSlidesPerView();
  if (visibleProjects > slidesPerView) {
    mobileNav.classList.remove("hidden");
  } else {
    mobileNav.classList.add("hidden");
  }

  updateProjectsIndicator();
};

let isSmallCardLastResult = false;
let translations: (typeof projectsTranslations)["en"];

let timeout: NodeJS.Timeout;
const getRepresentativeCardWidth = (): number | null => {
  const slides = Array.from(
    document.querySelectorAll<HTMLElement>(".project-slide"),
  );
  const visibleSlide =
    slides.find((slide) => slide.style.display !== "none") ??
    slides[0] ??
    null;
  const card =
    visibleSlide?.querySelector<HTMLElement>(".project-card") ??
    document.querySelector<HTMLElement>(".project-card") ??
    null;

  return card ? card.getBoundingClientRect().width : null;
};

const setCardStyles = () => {
  const SMALL_CARD_WIDTH = 400;
  const cardWidth = getRepresentativeCardWidth();
  const isSmallCard =
    cardWidth !== null ? cardWidth < SMALL_CARD_WIDTH : window.innerWidth < 768;

  if (isSmallCard === isSmallCardLastResult) return;

  isSmallCardLastResult = isSmallCard;

  const buttonLabels = document.getElementsByClassName("button-label");
  for (const labelRef of buttonLabels) {
    labelRef.classList.toggle("text-sm", isSmallCard);
  }

  const viewMoreButtons = document.getElementsByClassName("view-more");
  for (const buttonRef of viewMoreButtons) {
    buttonRef.classList.toggle("hidden", !isSmallCard);
  }

  projectsData.forEach((project) => {
    const id = project.path;
    const cards = document.querySelectorAll<HTMLElement>(
      `.project-card[data-project="${id}"]`,
    );
    if (!cards.length) return;

    const fullDescription = translations[id].description;
    const shortDescriptionBase = fullDescription.split(".")[0];
    const shortDescription = shortDescriptionBase
      ? `${shortDescriptionBase}.`
      : fullDescription;
    const showFull = isSmallCard ? showFullDescription[id] : true;
    const descriptionText = showFull ? fullDescription : shortDescription;
    const viewMoreText = showFullDescription[id]
      ? translations.less
      : translations.more;
    const hideTechnologies = isSmallCard ? showFullDescription[id] : false;

    cards.forEach((card) => {
      const descriptionRef = card.querySelector<HTMLElement>(".description");
      const viewMoreButton = card.querySelector<HTMLButtonElement>(".view-more");
      const technologies = card.querySelector<HTMLElement>(
        ".project-technologies",
      );

      if (descriptionRef) {
        descriptionRef.innerHTML = descriptionText;
      }
      if (viewMoreButton) {
        viewMoreButton.innerText = viewMoreText;
      }
      if (technologies) {
        technologies.classList.toggle("hidden", hideTechnologies);
      }
    });
  });
};

const scheduleCardStyles = () => {
  clearTimeout(timeout);
  timeout = setTimeout(setCardStyles, 150);
};

const showFullDescription = {
  lift: false,
  meteor: false,
  radley: false,
  reconnect: false,
};

const handleViewMoreClick = (id: ProjectNames) => {
  showFullDescription[id] = !showFullDescription[id];
  const fullDescription = translations[id].description;
  const shortDescriptionBase = fullDescription.split(".")[0];
  const shortDescription = shortDescriptionBase
    ? `${shortDescriptionBase}.`
    : fullDescription;
  const cards = document.querySelectorAll<HTMLElement>(
    `.project-card[data-project="${id}"]`,
  );

  cards.forEach((card) => {
    const description = card.querySelector<HTMLElement>(".description");
    const viewMoreButton = card.querySelector<HTMLButtonElement>(".view-more");
    const technologies = card.querySelector<HTMLElement>(
      ".project-technologies",
    );

    if (!viewMoreButton || !description || !technologies) return;

    if (showFullDescription[id]) {
      viewMoreButton.innerText = translations.less;
      description.innerHTML = fullDescription;
      technologies.classList.add("hidden");
    } else {
      viewMoreButton.innerText = translations.more;
      description.innerHTML = shortDescription;
      technologies.classList.remove("hidden");
    }
  });
};

const onReady = () => {
  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.altKey || event.ctrlKey) return;
    lastInputWasKeyboard = true;
  });
  document.addEventListener("pointerdown", () => {
    lastInputWasKeyboard = false;
  });

  initializeProjectsSwiper();
  initializeProjectsGallerySwiper();

  const lang = document.firstElementChild?.getAttribute("lang") as "en" | "es";
  translations = projectsTranslations[lang];

  setCardStyles();
  window.addEventListener("resize", scheduleCardStyles);

  setProjectTechnologiesTooltips(projectsData);
  setProjectTypeTooltips();
  addFiltersListeners();
  addProjectCardButtonsListeners();

  mobilePrevButton = document.getElementById("projects-prev");
  mobileNextButton = document.getElementById("projects-next");
  projectsIndicator = document.getElementById("projects-indicator");
  mobileNextButton?.addEventListener("click", () => {
    projectSwiper?.slideNext();
  });
  mobilePrevButton?.addEventListener("click", () => {
    projectSwiper?.slidePrev();
  });

  updateMobileNavVisibility();
  updateProjectSlidesFocusability();
  addProjectsAutoplayGuards();
  projectSwiper?.on("slideChange", () => {
    updateProjectsIndicator();
    updateProjectSlidesFocusability();
  });
  projectSwiper?.on("transitionEnd", updateProjectSlidesFocusability);
  window.addEventListener("resize", () => {
    allowAutoplay = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    updateMobileNavVisibility();
    updateProjectSlidesFocusability();
    setProjectsAutoplay(allowAutoplay);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onReady);
} else {
  onReady();
}
