import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Auth.vue'),
        meta: {
          pageName: 'Login'
        }
      }
    ]
  },
  {
    path: '/nearby',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/NearbyVenues.vue'),
        meta: {
          pageName: 'Nearby Venues'
        }
      }
    ]
  },
  {
    path: '/venue/:id',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/VenueInfo.vue'),
        meta: {
          pageName: 'Venue Info',
          subPage: true
        }
      },
      {
        path: 'queue',
        component: () => import('pages/queue/VenueQueue.vue'),
        meta: {
          spotifyAuth: true,
          pageName: 'Venue Queue',
          subPage: true
        }
      }
    ]
  },
  {
    name: 'profile',
    path: '/profile',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/profile/UserProfile.vue'),
        meta: {
          pageName: 'Profile'
        }
      },
      {
        path: 'edit',
        component: () => import('pages/profile/EditProfile.vue'),
        meta: {
          pageName: 'Edit Profile',
          subPage: true
        }
      }
    ]
  },
  {
    path: '/manage-venues',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/venueManagement/ManageVenues.vue'),
        meta: {
          pageName: 'Manage Venues',
        }
      },
      {
        path: 'create',
        component: () => import('pages/venueManagement/CreateEditVenue.vue'),
        meta: {
          pageName: 'Create Venue',
          subPage: true
        }
      },
      {
        path: ':id',
        component: () => import('pages/venueManagement/VenueDetails.vue'),
        name: 'Venue Details',
        meta: {
          pageName: 'Venue Details',
          subPage: true
        }
      },
      {
        path: ':id/edit',
        component: () => import('pages/venueManagement/CreateEditVenue.vue'),
        name: 'Edit Venue',
        meta: {
          pageName: 'Edit Venue',
          subPage: true
        }
      },
      {
        path: ':id/allow-deny',
        component: () => import('pages/venueManagement/AllowDenyPage.vue'),
        name: 'Allow/Deny List',
        meta: {
          pageName: 'Allow/Deny List',
          subPage: true
        }
      },
      {
        path: 'dashboard/:id',
        component: () => import('pages/venueManagement/VenueDashboard.vue'),
        meta: {
          pageName: 'Venue Dashboard',
          subPage: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {
      pageName: 'Page Not Found (Error 404)'
    }
  }
];

export default routes;
