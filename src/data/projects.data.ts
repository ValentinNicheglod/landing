import type { Project } from "../models/types/project.type";
import { ProjectFilters } from "../models/enums/filters.enum";

export const projectsData: Project[] = [
  {
    path: "reconnect",
    name: "ReConnect",
    github: "https://github.com/valentinnicheglod1/pricing-page",
    url: "https://valentinnicheglod1.github.io/pricing-page/",
    galleryImages: ["home"],
    technologies: ["React", "Tailwind", "Ant Design", "Scroll Reveal"],
    type: ProjectFilters.DEV,
  },
  {
    path: "lift",
    name: "Lift Buildings",
    github: "https://github.com/ValentinNicheglod/lift-construcciones",
    url: "https://valentinnicheglod.github.io/lift-construcciones/",
    technologies: ["Astro", "Tailwind", "Ant Design", "Bulma"],
    galleryImages: ["home.scroll"],
    scrollablePrototype: true,
    type: ProjectFilters.DEV,
  },
  {
    path: "radley",
    name: "Radley",
    behance: "https://www.behance.net/gallery/159262049/Radley",
    url: "https://www.figma.com/proto/mKtUDUKJ8F8LKVewdXe7yq/Radley-Prototype?page-id=0%3A1&node-id=1%3A536&viewport=731%2C386%2C0.06&scaling=scale-down-width&starting-point-node-id=1%3A536",
    technologies: ["Figma", "Illustrator"],
    type: ProjectFilters.DESIGN,
    galleryImages: [
      "home.scroll",
      "login",
      "signup",
      "recommended-products.scroll",
      "product.scroll",
      "cart.scroll",
      "checkout-1.scroll",
      "checkout-2.scroll",
      "checkout-3.scroll",
    ],
    scrollablePrototype: true,
  },
  {
    path: "meteor",
    name: "Meteor",
    behance: "https://www.behance.net/gallery/158637771/Meteor-UX-Case-Study",
    url: "https://www.figma.com/proto/Ehw4AATRdzR9nvnOSarXC5/Meteor-Prototype?page-id=0%3A1&node-id=0%3A1&viewport=1446%2C517%2C0.17&scaling=min-zoom&starting-point-node-id=1%3A2821",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    type: ProjectFilters.DESIGN,
    galleryImages: [
      "login",
      "signup",
      "home",
      "favorites",
      "product",
      "search",
      "cart",
      "checkout",
    ],
  },
];
