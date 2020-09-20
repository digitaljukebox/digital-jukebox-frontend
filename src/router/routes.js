const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    meta: {
      auth: true
    },
    component: () => require('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => require('pages/Index.vue') }]
  },
  {
    path: '/login',
    component: () => require('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => require('pages/Auth.vue')
      }
    ]
  },
  {
    path: '/nearby',
    meta: {
      auth: true
    },
    component: () => require('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => require('pages/NearbyVenues.vue')
      }
    ]
  },
  {
    path: '/venue/:id',
    meta: {
      auth: true
    },
    component: () => require('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => require('pages/VenueInfo.vue')
      },
      {
        path: 'queue',
        component: () => require('pages/queue/VenueQueue.vue'),
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
    component: () => require('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => require('pages/profile/UserProfile.vue')
      },
      {
        path: 'edit',
        component: () => require('pages/profile/EditProfile.vue')
      }
    ]
  },
  {
    path: '/manage-venues',
    meta: {
      auth: true
    },
    component: () => require('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => require('pages/venueManagement/ManageVenues.vue')
      },
      {
        path: 'create',
        component: () => require('pages/venueManagement/CreateEditVenue.vue')
      },
      {
        path: ':id',
        component: () => require('pages/venueManagement/VenueDetails.vue')
      },
      {
        path: ':id/edit',
        component: () => require('pages/venueManagement/CreateEditVenue.vue')
      },
      {
        path: 'dashboard/:id',
        component: () => require('pages/venueManagement/VenueDashboard.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => require('pages/Error404.vue')
  }
];

export default routes;
