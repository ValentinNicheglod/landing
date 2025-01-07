import type { SkillFilters } from "../enums/filters.enum";

export interface Skill {
  name: string;
  image: string;
  type?: SkillFilters;
  customClass?: string;
}

export interface SkillList {
  title: string;
  icon: string;
  type: SkillFilters;
  skills: Skill[];
}
