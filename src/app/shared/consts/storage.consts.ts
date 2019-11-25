export const SESSION_KEY_APP_DIRECTION = 'app-direction';
export type tAppDirections = 'rtl' | 'ltr';
export enum eAppDirections {
    RTL = 'rtl',
    LTR = 'ltr'
}

export const NavigationItems = [
    {
        displayName: 'navigation-menu.interiors',
        iconName: 'bathtub',
        route: 'interiors',
        children: [
            // {
            //     displayName: 'navigation-menu.project',
            //     route: 'project'
            // }
        ]
    },
    {
        displayName: 'navigation-menu.architectures',
        iconName: 'apartment',
        route: 'architectures',
        children: []
    },
    {
        displayName: 'navigation-menu.products',
        iconName: 'hotel',
        route: 'products',
        children: []
    },
    {
        displayName: 'navigation-menu.about',
        iconName: 'info',
        route: 'about',
        children: []
    },
    {
        displayName: 'navigation-menu.contacts',
        iconName: 'phone',
        route: 'contacts',
        children: []
    }
];
