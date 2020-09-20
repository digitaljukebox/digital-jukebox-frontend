import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';
import firebase from 'firebase';
import { spotifyCallbackRoute } from 'src/services/firebase/spotify';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  // Firebase auth guard
  Router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next({
            path: '/login'
          });
        }
      });
    } else if (to.matched.some(record => record.meta.guest)) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next({
            path: '/profile'
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });

  // Spotify auth callback guard
  Router.beforeEach((to, from, next) => {
    if (to.path === '/spotify-callback') {
      spotifyCallbackRoute(to.hash);
      next('/');
    } else {
      next();
    }
  });

  Router.afterEach((to) => {
    document.title = to.meta.pageName ? to.meta.pageName + ' | Digital Jukebox' : 'Digital Jukebox';
  });

  return Router;
});
