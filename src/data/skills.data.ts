import aboutTranslations from "../locales/about.locales.json";
import { Emojis } from "../models/enums/emojis.enum";
import { SkillFilters } from "../models/enums/filters.enum";
import type { Skill, SkillList } from "../models/types/skills.type";

export const getSkillsData = (lang: "es" | "en") => {
  const translations = aboutTranslations[lang];

  return [
    {
      title: translations.skills.personal,
      type: SkillFilters.PERSONAL,
      icon: Emojis.Personal,
      skills: [
        {
          name: translations.skills.commitment,
          image: "Commitment",
        },
        {
          name: translations.skills.proactivity,
          image: "Proactivity",
        },
        {
          name: translations.skills.detailAttention,
          image: "DetailAttention",
        },
        {
          name: translations.skills.creativity,
          image: "Creativity",
        },
        {
          name: translations.skills.flexibility,
          image: "Flexibility",
        },
        {
          name: translations.skills.leadership,
          image: "Leadership",
        },
      ],
    },
    {
      title: translations.skills.design,
      type: SkillFilters.DESIGN,
      icon: Emojis.Designer,
      skills: [
        {
          name: "Adobe XD",
          image: "XD",
          customClass: "dark-shadow",
        },
        {
          name: "Illustrator",
          image: "Illustrator",
          customClass: "dark-shadow",
        },
        {
          name: "Photoshop",
          image: "Photoshop",
          customClass: "dark-shadow",
        },
        {
          name: "Figma",
          image: "Figma",
          customClass: "dark-shadow",
        },
        {
          name: translations.skills.prototyping,
          image: "Prototype",
          customClass: "dark-shadow",
        },
        {
          name: "WireFraming",
          image: "Wireframe",
          customClass: "dark-shadow",
        },
      ],
    },
    {
      title: translations.skills.dev,
      icon: Emojis.Developer,
      type: SkillFilters.DEV,
      skills: [
        {
          name: "Javascript",
          image: "JS",
          type: SkillFilters.DEV,
        },
        {
          name: "Typescript",
          image: "TS",
        },
        {
          name: "Python",
          image: "Python",
        },
        {
          name: "HTML 5",
          image: "HTML",
        },
        {
          name: "CSS 3",
          image: "CSS",
        },
        {
          name: "GIT",
          image: "GIT",
        },
        {
          name: "React",
          image: "React",
        },
        {
          name: "Angular",
          image: "Angular",
        },
        {
          name: "Astro",
          image: "Astro",
          customClass: "dark-shadow",
        },
        {
          name: "Ionic",
          image: "Ionic",
        },
        {
          name: "Expo",
          image: "Expo",
          customClass: "dark-invert",
        },
        {
          name: "Redux",
          image: "Redux",
        },
        {
          name: "Webpack",
          image: "Webpack",
        },
        {
          name: "RxJS",
          image: "Rxjs",
        },
        {
          name: "Tailwind CSS",
          image: "Tailwind",
        },
        {
          name: "Sass",
          image: "Sass",
        },
        {
          name: "Less",
          image: "Less",
          customClass: "dark-shadow",
        },
        {
          name: "Bootstrap",
          image: "Bootstrap",
        },
        {
          name: "Node JS",
          image: "Node",
        },
        {
          name: "Express",
          image: "Express",
          customClass: "dark-invert",
        },
        {
          name: "NPM",
          image: "NPM",
        },
        {
          name: "Firebase",
          image: "Firebase",
        },
        {
          name: "Eslint",
          image: "Eslint",
        },
        {
          name: "Prettier",
          image: "Prettier",
        },
        {
          name: "MongoDB",
          image: "MongoDB",
        },
        {
          name: "MySQL",
          image: "MySQL",
          customClass: "dark-shadow",
        },
        {
          name: "PostgreSQL",
          image: "PostgreSQL",
        },
        {
          name: "Sequelize",
          image: "Sequelize",
        },
        {
          name: "Postman",
          image: "Postman",
        },
        {
          name: "GitHub",
          image: "GitHub",
          customClass: "dark-invert",
        },
      ],
    },
  ];
};

export const getAllSkills = (lang: "es" | "en") => {
  const skillsData = getSkillsData(lang);
  return skillsData
    .map((skillCategory) => {
      return skillCategory.skills.map((skill) => {
        return {
          ...skill,
          type: skillCategory.type,
        };
      });
    })
    .flat();
};
