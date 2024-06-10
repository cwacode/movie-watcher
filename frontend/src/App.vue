<template>
  <v-layout full-height full-width>
    <Header />
    <v-main>
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
});
</script>

<style scoped>

</style>
