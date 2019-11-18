export const SESSION_KEY_APP_DIRECTION = 'app-direction';
export type tAppDirections = 'rtl' | 'ltr';
export enum eAppDirections {
    RTL = 'rtl',
    LTR = 'ltr'
}

export const NavigationItems = [
    {
        displayName: 'navigation-menu.projects',
        iconName: 'add',
        route: 'projects',
        children: [
            // {
            //     displayName: 'navigation-menu.project',
            //     route: 'project'
            // }
        ]
    },
    {
        displayName: 'navigation-menu.product',
        iconName: 'add',
        route: 'products',
        children: []
    },
    {
        displayName: 'navigation-menu.about',
        iconName: 'add',
        route: 'about',
        children: []
    },
    {
        displayName: 'navigation-menu.contacts',
        iconName: 'add',
        route: 'contacts',
        children: []
    }
];
