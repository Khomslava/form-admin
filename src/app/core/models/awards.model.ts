export interface IAward {
  id: string;
  index: number;
  logo: string;
  name: string;
  projects: IAwardsProject[];
}

export interface IAwardsProject {
  link: string;
  index: number;
  content: IAwardsProjectTranslate[];
}

export interface IAwardsProjectTranslate {
  name: string;
  text: number;
}
