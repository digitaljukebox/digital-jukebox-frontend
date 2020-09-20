// import something here
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueGoogleMaps: any = require('vue2-google-maps');
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }: any) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAu3v71qDLKEEF4QCpOezDfnJlBMXv3Kno',
      libraries: 'places' // This is required if you use the Autocomplete plugin
    }
  });
};
