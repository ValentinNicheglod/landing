import type { ProjectFilters } from "../enums/filters.enum";

export type ProjectNames = "lift" | "meteor" | "radley" | "reconnect";

export type Project = {
  path: ProjectNames;
  name: string;
  url: string;
  type: ProjectFilters;
  galleryImages: string[];
  scrollablePrototype?: boolean;
  technologies: string[];
} & ({ github: string; behance?: never } | { behance: string; github?: never });
