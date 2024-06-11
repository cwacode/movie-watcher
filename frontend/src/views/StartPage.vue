<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4" class="mt-16">
        <v-card>
          <v-card-title class="text-h4 text-center">{{ isLogin ? 'Login' : 'Register' }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="form.username" data-cy="Username" label="Username" required></v-text-field>
              <v-text-field v-model="form.password" data-cy="Password" label="Password" required type="password"></v-text-field>
              <div class="button-group">
                <v-btn type="submit" color="primary">{{ isLogin ? 'Log in' : 'Register' }}</v-btn>
                <v-btn color="secondary" @click="toggleForm">{{ isLogin ? 'Go to Register' : 'Go to Login' }}</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="red"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { mapStores } from 'pinia';
import { useAuthStore } from '../store/authStore';

export default defineComponent({
  name: 'StartPage',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isLogin: true,
      snackbar: {
        show: false,
        text: ''
      }
    };
  },
  watch: {
    '$route.path'(newPath) {
      this.isLogin = newPath.includes('/login');
    }
  },
  methods: {
    async submit() {
      const path = this.isLogin ? '/api/auth/login' : '/api/auth/register';
      try {
        const response = await axios.post(path, this.form);
        if (response.status === 201) { // Assuming 201 is for successful registration
          this.snackbar.text = "Successfully registered. Please log in.";
          this.snackbar.show = true;
          this.$router.push({ name: 'Login' });
        } else if (response.status === 200) { // Assuming 200 is for successful login
          this.$router.push({ name: 'MoviePage' });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          this.snackbar.text = error.response.data.message || 'An unexpected error occurred';
          this.snackbar.show = true;
        } else {
          this.snackbar.text = 'An unexpected network error occurred';
          this.snackbar.show = true;
        }
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    closeSnackbar() {
      this.snackbar.show = false;
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  }
});
</script>




<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
