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
import { changeButtonState, translateIndicator } from "./filters.scripts";
import { setProjectTechnologiesTooltips } from "./tooltips.scripts";

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
  const options: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      pauseOnMouseEnter: true,
    },
    breakpoints: {
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
    },
    modules: [Autoplay],
  };
  return options;
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
const initializeProjectsSwiper = () => {
  projectSwiper = new Swiper("#projects-swiper", getProjectsListSwiperConfig());
};

const addProjectCardButtonsListeners = () => {
  projectsData.forEach((project) => {
    if (project.type === ProjectFilters.DEV) {
      const githubButton = document.getElementById(
        `${project.path}-github-button`,
      );
      githubButton?.addEventListener("click", () =>
        window.open(project.github, "_blank"),
      );
    }

    if (project.type === ProjectFilters.DESIGN) {
      const behanceButton = document.getElementById(
        `${project.path}-behance-button`,
      );
      behanceButton?.addEventListener("click", () =>
        window.open(project.behance, "_blank"),
      );
    }

    const openProjectButton = document.getElementById(
      `${project.path}-open-button`,
    );
    openProjectButton?.addEventListener("click", () => {
      window.open(project.url, "_blank");
    });

    const viewMoreButton = document.getElementById(`view-more-${project.path}`);
    viewMoreButton?.addEventListener("click", () =>
      handleViewMoreClick(project.path),
    );

    const openGalleryButton = document.getElementById(
      `${project.path}-gallery-button`,
    );
    const closeGalleryButton = document.getElementById(
      `${project.path}-gallery-close-button`,
    );
    openGalleryButton?.addEventListener("click", () =>
      openGalleryModal(project.path),
    );
    closeGalleryButton?.addEventListener("click", () =>
      closeGalleryModal(project.path),
    );
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

const openGalleryModal = (projectPath: string) => {
  const dialog = document.getElementById(
    `${projectPath}-gallery`,
  ) as HTMLDialogElement;
  const closeButton = document.getElementById(`${projectPath}-close-btn`);

  projectSwiper?.disable();

  dialog?.showModal();

  dialog?.blur();
  closeButton?.blur();
};

const closeGalleryModal = (projectPath: string) => {
  const ANIMATION_DURATION = 700;
  const galleryModal = document.getElementById(
    `${projectPath}-gallery`,
  ) as HTMLDialogElement;

  galleryModal.classList.add("closing");

  setTimeout(() => {
    projectSwiper?.enable();
    galleryModal.classList.remove("closing");
    galleryModal.close();
  }, ANIMATION_DURATION);
};

let selectedFilterIndex: ProjectFilters;
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
  projectSwiper?.autoplay?.start();
  projectSwiper?.update();
};

let isSmallCardLastResult = false;
let translations: (typeof projectsTranslations)["en"];

let timeout: NodeJS.Timeout;
const setCardStyles = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const projectCard = document.querySelector(".project-card") as HTMLElement;
    const isSmallCard = projectCard.clientWidth < 400;

    if (isSmallCard === isSmallCardLastResult) return;

    isSmallCardLastResult = isSmallCard;

    const buttonLabels = document.getElementsByClassName("button-label");
    for (const labelRef of buttonLabels) {
      labelRef.classList.toggle("text-sm");
    }

    const viewMoreButtons = document.getElementsByClassName("view-more");
    for (const buttonRef of viewMoreButtons) {
      buttonRef.classList.toggle("hidden");
    }

    projectsData.forEach((project) => {
      const id = project.path;

      const descriptionRef = document.getElementById(`description-${id}`);
      if (!descriptionRef) return;

      if (isSmallCard) {
        const shortDescription = translations[id].description.split(".")[0];
        descriptionRef.innerHTML = `${shortDescription}.`;
      } else {
        const fullDescription = translations[id].description;
        descriptionRef.innerHTML = fullDescription;
      }
    });
  }, 3000);
};

const showFullDescription = {
  lift: false,
  meteor: false,
  radley: false,
  reconnect: false,
};

const handleViewMoreClick = (id: ProjectNames) => {
  showFullDescription[id] = !showFullDescription[id];
  const description = document.getElementById(`description-${id}`);
  const viewMoreButton = document.getElementById(`view-more-${id}`);
  const technologies = document.getElementById(`technologies-${id}`);
  const fullDescription = translations[id].description;
  const shortDescription = fullDescription.split(".")[0] + ".";

  if (!viewMoreButton || !description || !technologies) return;

  if (showFullDescription[id]) {
    viewMoreButton.innerText = translations.less;
    description.innerHTML = fullDescription;
    setDescriptionReadingTime();
  } else {
    viewMoreButton.innerText = translations.more;
    description.innerHTML = shortDescription;
    projectSwiper?.autoplay.resume();
  }
  technologies.classList.toggle("hidden");
};

const setDescriptionReadingTime = () => {
  const READING_TIME = 7000;
  projectSwiper?.autoplay.pause();
  setTimeout(() => projectSwiper?.autoplay.resume(), READING_TIME);
};

const addDescriptionReadingTimeOnClick = () => {
  if (window.innerWidth < 768) {
    for (const projectCard of document.getElementsByClassName("project-card")) {
      projectCard.addEventListener("click", setDescriptionReadingTime);
    }
  }
};

const disableAutoplayOnTab = () => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Tab") {
      projectSwiper?.autoplay.stop();
      projectSwiper?.slideTo(0);
      document.removeEventListener("keyup", disableAutoplayOnTab);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeProjectsSwiper();
  initializeProjectsGallerySwiper();

  const lang = document.firstElementChild?.getAttribute("lang") as "en" | "es";
  translations = projectsTranslations[lang];

  setCardStyles();
  window.addEventListener("resize", setCardStyles);

  addDescriptionReadingTimeOnClick();
  setProjectTechnologiesTooltips(projectsData);
  addFiltersListeners();
  addProjectCardButtonsListeners();
  disableAutoplayOnTab();
});
