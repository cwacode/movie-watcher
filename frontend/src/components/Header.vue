<template>
  <v-app-bar color="black" v-if="shouldShowHeader">
    <v-container fluid>
      <v-row no-gutters>
        <v-col class="text-start">
          <router-link to="/movies" class="text-white text-h4">Movies</router-link>
        </v-col>
        <v-col class="text-end">
          <router-link to="/users" class="text-white text-h4">User page</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();
    const shouldShowHeader = computed(() => {
      const noHeaderRoutes = ['/', '/login', '/register'];
      return !noHeaderRoutes.includes(router.currentRoute.value.path);
    });

    return { shouldShowHeader };
  }
});
</script>
