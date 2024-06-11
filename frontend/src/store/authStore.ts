import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    username: null,
  }),
  getters: {
    currentRoute: () => {
      const route = useRoute();
      return computed(() => route.path);
    }
  },
  actions: {
    login(username: string) {
      this.isLoggedIn = true;
      this.username = username;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = null;
    }
  }
});
