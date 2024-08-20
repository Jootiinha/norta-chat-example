export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'chat',
      displayName: 'Norta.IA',
      meta: {
        icon: 'chat',
      },
    },
    // {
    //   name: 'registrations',
    //   displayName: 'menu.registrations',
    //   meta: {
    //     icon: 'add_circle',
    //   },
    //   children: [
    //     {
    //       name: 'register-property',
    //       displayName: 'menu.register_property',
    //     },
    //   ],
    // },
    // {
    //   name: 'financial-assets',
    //   displayName: 'menu.financial-assets',
    //   meta: {
    //     icon: 'insert_chart',
    //   },
    // },
    // {
    //   name: 'projects',
    //   displayName: 'menu.projects',
    //   meta: {
    //     icon: 'folder_shared',
    //   },
    // },
    // {
    //   name: 'payments',
    //   displayName: 'menu.payments',
    //   meta: {
    //     icon: 'credit_card',
    //   },
    //   children: [
    //     {
    //       name: 'payment-methods',
    //       displayName: 'menu.payment-methods',
    //     },
    //     {
    //       name: 'pricing-plans',
    //       displayName: 'menu.pricing-plans',
    //     },
    //     {
    //       name: 'billing',
    //       displayName: 'menu.billing',
    //     },
    //   ],
    // },
    // {
    //   name: 'auth',
    //   displayName: 'menu.auth',
    //   meta: {
    //     icon: 'login',
    //   },
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login',
    //     },
    //     {
    //       name: 'signup',
    //       displayName: 'menu.signup',
    //     },
    //     {
    //       name: 'recover-password',
    //       displayName: 'menu.recover-password',
    //     },
    //   ],
    // },
    // {
    //   name: 'faq',
    //   displayName: 'menu.faq',
    //   meta: {
    //     icon: 'quiz',
    //   },
    // },
    // {
    //   name: '404',
    //   displayName: 'menu.404',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    // },
    // {
    //   name: 'preferences',
    //   displayName: 'menu.preferences',
    //   meta: {
    //     icon: 'manage_accounts',
    //   },
    // },
    // {
    //   name: 'settings',
    //   displayName: 'menu.settings',
    //   meta: {
    //     icon: 'settings',
    //   },
    // },
  ] as INavigationRoute[],
}
