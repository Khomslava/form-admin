export enum ERoutingPath {
    BASE = '',
    DEFAULT = 'interiors',
    PAGE_NOT_FOUND = 'page-not-found',
    ERROR_PAGE = 'error',
    LOGIN = 'login',
    INTERIORS = 'interiors',
    ARCHITECTURES = 'architectures',
    PRODUCTS = 'products',
    ABOUT = 'about',
    CONTACTS = 'contacts'
}

export const LAYOUT_DEFAULT_ROUTE = ERoutingPath.DEFAULT;

export interface ITitleLayout {
    translationKey?: string;
    title?: string;
    url?: string;
    level?: number;
    order?: number;
}
