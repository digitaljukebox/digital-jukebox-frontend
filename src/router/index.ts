import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';
import firebase from 'firebase';

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

  return Router;
});
