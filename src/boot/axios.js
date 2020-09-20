import axios from 'axios';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.prototype.$axios = axios;
});
