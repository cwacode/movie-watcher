<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4" class="mt-16">
        <v-card>
          <v-card-title class="text-h5">{{ isLogin ? 'Login' : 'Register' }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="form.username" label="Username" required></v-text-field>
              <v-text-field v-model="form.password" label="Password" required type="password"></v-text-field>
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
      <v-btn color="black" class="white-text" @click="closeSnackbar">Close</v-btn>
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
      isLogin: true,  // This will now be updated based on the route
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
        if (response.data) {
          this.snackbar.text = `Successfully ${this.isLogin ? 'logged in' : 'registered'}.`;
          this.snackbar.show = true;
          this.$router.push({ name: this.isLogin ? 'MoviePage' : 'Login' });
        }
      } catch (error) {
        this.snackbar.text = `Failed ${this.isLogin ? 'logged in' : 'registered'}.`;
        this.snackbar.show = true;
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.$router.push({ name: this.isLogin ? 'Login' : 'Register' });
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
