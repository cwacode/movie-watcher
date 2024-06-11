<template>
  <v-layout full-height full-width>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import Header from './components/Header.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
});
</script>

<style scoped>

</style>
