<template>
  <div id="q-app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App'
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
