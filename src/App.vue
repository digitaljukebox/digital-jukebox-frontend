<template>
  <div id="q-app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import 'assets/main.scss';
import { refreshSpotifyToken } from 'src/services/firebase/spotify';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    this.$axios.interceptors.response.use((response) => response, (error) => {
      // Do something with response error
      if (error.response.status === 401 && error.response.config.url.includes('api.spotify.com')) {
        refreshSpotifyToken();
      }
    });
  }
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
