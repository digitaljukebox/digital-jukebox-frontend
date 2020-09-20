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
        component: () => import('pages/Auth.vue')
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
        component: () => import('pages/NearbyVenues.vue')
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
        component: () => import('pages/VenueInfo.vue')
      },
      {
        path: 'queue',
        component: () => import('pages/queue/VenueQueue.vue'),
        meta: {
          spotifyAuth: true
        }
      }
    ]
  },
  {
    path: '/profile',
    meta: {
      auth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/profile/UserProfile.vue')
      },
      {
        path: 'edit',
        component: () => import('pages/profile/EditProfile.vue')
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
        component: () => import('pages/venueManagement/ManageVenues.vue')
      },
      {
        path: 'create',
        component: () => import('pages/venueManagement/CreateEditVenue.vue')
      },
      {
        path: ':id',
        component: () => import('pages/venueManagement/VenueDetails.vue')
      },
      {
        path: ':id/edit',
        component: () => import('pages/venueManagement/CreateEditVenue.vue')
      },
      {
        path: 'dashboard/:id',
        component: () => import('pages/venueManagement/VenueDashboard.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
