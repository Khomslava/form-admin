export interface IProject {
  id: string;
  name: string;
  orders: IProjectOrder;
  showInMainPages: boolean;
  square: number;
  year: number;
  photosLarge: IProjectPhoto[];
  factoryWebLink: string;
  categoryId: string[];
  translate: IProjectTranslate[];
}

export interface IProjectTranslate {
  name: string;
  authors: string;
  city: string;
  country: string;
  description: string;
  photographers: string;
  factory: string;
}

export interface IProjectPhoto {
  url: string;
  showOnMainPage: boolean;
  name: string;
  order: number;
}

export interface IProjectOrder {
  interior: number;
  architect: number;
  product: number;
}

