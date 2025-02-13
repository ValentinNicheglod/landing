import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { getSkillsData } from "../data/skills.data";
import {
  changeButtonState,
  translateIndicator,
} from "../scripts/filters.scripts";
import type { SkillFilters } from "../models/enums/filters.enum";
import type { SwiperSlide } from "swiper/element";
import type { SkillList } from "../models/types/skills.type";

let skillsSwiper: Swiper | null = null;
let selectedFilterIndex: SkillFilters = 0;

let skillsData: SkillList[] = [];

const initializeSkillsSwiper = () => {
  skillsSwiper?.destroy();

  skillsSwiper = new Swiper("#skills-swiper", {
    slidesPerView: 3,
    spaceBetween: 12,
    autoplay: {
      pauseOnMouseEnter: true,
    },
    modules: [Autoplay],
    breakpoints: getSwiperBreakpoints(),
  });
};

const addFiltersListeners = () => {
  const filters = document.getElementById("skills-filter");

  if (filters) {
    for (const filter of filters.children) {
      filter.addEventListener("click", () => handleFilter(filter));
    }

    handleFilter(filters.children[0]);
  }
};

const handleFilter = (filter: Element) => {
  const selectedIndex = filter.attributes.getNamedItem("data-value")?.value;

  if (selectedIndex) {
    selectedFilterIndex = parseInt(selectedIndex);
    changeButtonState(`skill-filter-${selectedFilterIndex}`, "skills-filter");
    translateIndicator("skills-filter-indicator", selectedFilterIndex);
    changeIcon();
    changeTitle();
    setSkillSlides();
  }
};

const changeIcon = () => {
  const skillsIcon = document.getElementById("skills-icon");

  if (skillsIcon) {
    skillsIcon.innerHTML = skillsData[selectedFilterIndex].icon;
  }
};

const changeTitle = () => {
  const skillsTitle = document.getElementById("skills-title");

  if (skillsTitle) {
    skillsTitle.innerHTML = skillsData[selectedFilterIndex].title;
  }
};

const setSkillSlides = () => {
  const skillSlides = document.querySelectorAll(
    ".skill-slide",
  ) as unknown as SwiperSlide[];

  skillSlides.forEach((slide) => {
    if (!slide.dataset.type) return;

    const projectType: SkillFilters = parseInt(slide.dataset.type);

    if (selectedFilterIndex === projectType) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  skillsSwiper?.slideTo(0, 0);
  skillsSwiper?.autoplay?.start();
  skillsSwiper?.update();
};

const getSwiperBreakpoints = () => {
  return {
    384: {
      slidesPerView: 3.25,
    },
    512: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 5,
    },
    768: {
      slidesPerView: 3.25,
    },
    880: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 5,
    },
    1218: {
      slidesPerView: 6,
    },
  };
};

const disableAutoplayOnTab = () => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Tab") {
      skillsSwiper?.autoplay.stop();
      skillsSwiper?.slideTo(0);
      document.removeEventListener("keyup", disableAutoplayOnTab);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.firstElementChild?.getAttribute("lang") as "en" | "es";
  skillsData = getSkillsData(lang);
  initializeSkillsSwiper();
  addFiltersListeners();
  disableAutoplayOnTab();
});
