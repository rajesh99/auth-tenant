import { Icons } from '@/components/Icons';

const routes = {
  routes_dashboard: [
    { title: 'Overview', link: '/main', icon: Icons.Home },
    { title: 'Todos', link: '/todos/create', icon: Icons.Laptop },
    { title: 'Invite', link: '/invite', icon: Icons.Users },
    { title: 'AI', link: '/ai', icon: Icons.Bot },
    { title: 'Admin', link: '/admin', icon: Icons.Lock },
    { title: 'Settings', link: '/settings/profile', icon: Icons.Settings }
  ],
  routes_dashboard_subroutes: {
    todos: [
      { title: 'Create', link: '/todos/create' },
      { title: 'My Todos', link: '/todos/my-todos' },
      { title: 'All Todos', link: '/todos/list-todos' }
    ],
    settings: [
      { title: 'Profile', link: '/settings/profile' },
      { title: 'Billing', link: '/settings/billing' },
      { title: 'Subscription', link: '/settings/subscription' }
    ]
  },
  routes_marketing: [
    { title: 'Pricing', link: '/pricing' },
    { title: 'FAQ', link: '/faq' },
    { title: 'Blog', link: '/blog' }
  ],
  routes_user: [
    { title: 'Create Org', link: '/user/create-org' },
    { title: 'Settings', link: '/user/settings' }
  ],
  redirects: {
    dashboard: {
      dashboardBase: '/dashboard/',
      toDashboard: '/main',
      settings: {
        toSubscription: '/settings/subscription',
        toBilling: '/settings/billing',
        toProfile: '/settings/profile',
        requireSub: '/settings/subscription-required',
        toAddSub: '/settings/add-subscription'
      },
      todos: { toMyTodos: '/todos/my-todos', createTodos: '/todos/create' }
    },
    auth: {
      toLogin: '/auth/login',
      requireAuth: '/auth/required',
      authConfirm: '/auth/confirmed',
      callback: '/api/auth-callback'
    },
    user: {
      toUserDashboard: '/user/dashboard',
      toOrgInvite: '/user/org-invite'
    }
  },
  footer_nav: {
    about: {
      title: 'About',
      routes: [
        { title: 'Pricing', link: '/pricing' },
        { title: 'FAQ', link: '/faq' }
      ]
    },
    resources: {
      title: 'Resources',
      routes: [
        { title: 'Blog', link: '/' },
        { title: 'Docs', link: '/' }
      ]
    },
    legal: {
      title: 'Legal',
      routes: [
        { title: 'Privacy Policy', link: '/' },
        { title: 'Terms and Conditions', link: '/' }
      ]
    }
  }
};

export default routes;
