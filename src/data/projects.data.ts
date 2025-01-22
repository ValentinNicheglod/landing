import type { Project } from "../models/types/project.type";

import { ProjectFilters } from "../models/enums/filters.enum";

import * as liftImages from "../images/projects/lift/_index";
import * as reconnectImages from "../images/projects/reconnect/_index";
import * as radleyImages from "../images/projects/radley/_index";
import * as meteorImages from "../images/projects/meteor/_index";

import * as technologyLogos from "../images/skills/_index";

export const projectsData: Project[] = [
  {
    path: "reconnect",
    name: "ReConnect",
    github: "https://github.com/valentinnicheglod1/pricing-page",
    url: "https://valentinnicheglod1.github.io/pricing-page/",
    galleryImages: [reconnectImages.home],
    technologies: [
      { name: "React", image: technologyLogos.react },
      { name: "Tailwind", image: technologyLogos.tailwind },
      { name: "Ant Design", image: technologyLogos.antDesign },
      { name: "Scroll Reveal", image: technologyLogos.scrollReveal },
    ],
    type: ProjectFilters.DEV,
    logo: reconnectImages.logo,
    background: reconnectImages.background
  },
  {
    path: "lift",
    name: "Lift Buildings",
    github: "https://github.com/ValentinNicheglod/lift-construcciones",
    url: "https://valentinnicheglod.github.io/lift-construcciones/",
    technologies: [
      { name: "Astro", image: technologyLogos.astro },
      { name: "Tailwind", image: technologyLogos.tailwind },
      { name: "Ant Design", image: technologyLogos.antDesign },
      { name: "Bulma", image: technologyLogos.bulma },
    ],
    galleryImages: [liftImages.home],
    scrollablePrototype: true,
    type: ProjectFilters.DEV,
    logo: liftImages.logo,
    mockup: liftImages.mockup,
    background: liftImages.background
  },
  {
    path: "radley",
    name: "Radley",
    behance: "https://www.behance.net/gallery/159262049/Radley",
    url: "https://www.figma.com/proto/mKtUDUKJ8F8LKVewdXe7yq/Radley-Prototype?page-id=0%3A1&node-id=1%3A536&viewport=731%2C386%2C0.06&scaling=scale-down-width&starting-point-node-id=1%3A536",
    technologies: [
      { name: "Figma", image: technologyLogos.figma },
      { name: "Illustrator", image: technologyLogos.illustrator },
    ],
    type: ProjectFilters.DESIGN,
    logo: radleyImages.logo,
    galleryImages: [
      radleyImages.home,
      radleyImages.login,
      radleyImages.signUp,
      radleyImages.recommendedProducts,
      radleyImages.product,
      radleyImages.cart,
      radleyImages.checkout1,
      radleyImages.checkout2,
      radleyImages.checkout3,
    ],
    scrollablePrototype: true,
    mockup: radleyImages.mockup,
    background: radleyImages.background
  },
  {
    path: "meteor",
    name: "Meteor",
    behance: "https://www.behance.net/gallery/158637771/Meteor-UX-Case-Study",
    url: "https://www.figma.com/proto/Ehw4AATRdzR9nvnOSarXC5/Meteor-Prototype?page-id=0%3A1&node-id=0%3A1&viewport=1446%2C517%2C0.17&scaling=min-zoom&starting-point-node-id=1%3A2821",
    technologies: [
      { name: "Figma", image: technologyLogos.figma },
      { name: "Illustrator", image: technologyLogos.illustrator },
      { name: "Photoshop", image: technologyLogos.photoshop },
    ],
    type: ProjectFilters.DESIGN,
    logo: meteorImages.logo,
    galleryImages: [
      meteorImages.login,
      meteorImages.signUp,
      meteorImages.home,
      meteorImages.favorites,
      meteorImages.product,
      meteorImages.search,
      meteorImages.cart,
      meteorImages.checkout,
    ],
    background: meteorImages.background
  },
];
