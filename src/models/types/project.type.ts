import type { ProjectFilters } from "../enums/filters.enum";

type ProjectNames = "lift" | "meteor" | "radley" | "reconnect";

export type Project = {
  path: ProjectNames;
  name: string;
  url: string;
  type: ProjectFilters;
  technologies: string[];
} & ({ github: string; behance?: never } | { behance: string; github?: never });
