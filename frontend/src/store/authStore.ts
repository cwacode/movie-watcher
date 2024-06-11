import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  currentRoute: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    username: null,
    currentRoute: useRoute().path // This won't be reactive; we'll handle reactivity differently.
  }),
  actions: {
    login(username: string) {
      this.isLoggedIn = true;
      this.username = username;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = null;
    },
    updateRoute(path: string) {
      this.currentRoute = path;
    }
  }
});
