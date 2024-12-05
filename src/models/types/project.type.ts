import type { Filters } from "../enums/filters.enum";

type ProjectNames = "lift" | "meteor" | "radley" | "reconnect";

export type Project = {
  path: ProjectNames;
  name: string;
  url: string;
  type: Filters;
  galleryImages: string[];
  scrollablePrototype?: boolean;
  technologies: string[];
} & ({ github: string; behance?: never } | { behance: string; github?: never });
