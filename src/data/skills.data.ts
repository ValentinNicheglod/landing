import aboutTranslations from "../locales/about.locales.json";
import { Emojis } from "../models/enums/emojis.enum";

export const getSkillsData = (lang: "es" | "en") => {
  const translations = aboutTranslations[lang];
  
  return [
    {
      title: translations.skills.personal,
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
      icon: Emojis.Designer,
      skills: [
        {
          name: "Adobe XD",
          image: "XD",
        },
        {
          name: "Illustrator",
          image: "Illustrator",
        },
        {
          name: "Photoshop",
          image: "Photoshop",
        },
        {
          name: "Figma",
          image: "Figma",
        },
        {
          name: translations.skills.prototyping,
          image: "Prototype",
        },
        {
          name: "WireFraming",
          image: "Wireframe",
        },
      ],
    },
    {
      title: translations.skills.dev,
      icon: Emojis.Developer,
      skills: [
        {
          name: "Javascript",
          image: "JS",
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
        },
        {
          name: "Ionic",
          image: "Ionic",
        },
        {
          name: "Expo",
          image: "Expo",
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
        },
      ],
    },
  ];
};
