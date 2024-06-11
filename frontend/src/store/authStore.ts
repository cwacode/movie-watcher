import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  userId: number | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: false,
    username: null,
    userId: null,
  }),
  getters: {
    currentRoute: () => {
      const route = useRoute();
      return computed(() => route.path);
    }
  },
  actions: {
    login(username: string, userId: number) {
      this.isLoggedIn = true;
      this.username = username;
      this.userId = userId;
      console.log(this.userId)
    },
    logout() {
      this.isLoggedIn = false;
      this.username = null;
      this.userId = null;
    }
  }
});
