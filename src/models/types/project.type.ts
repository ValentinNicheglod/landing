import type { ProjectFilters } from "../enums/filters.enum";

export type ProjectNames = "lift" | "meteor" | "radley" | "reconnect";

export type Project = {
  path: ProjectNames;
  name: string;
  url: string;
  type: ProjectFilters;
  logo: ImageMetadata,
  galleryImages: ImageMetadata[];
  scrollablePrototype?: boolean;
  mockup?: ImageMetadata,
  background: ImageMetadata,
  technologies: { name: string, image: ImageMetadata }[];
} & ({ github: string; behance?: never } | { behance: string; github?: never });
