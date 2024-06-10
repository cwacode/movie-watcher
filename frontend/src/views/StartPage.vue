<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-h5">{{ isLogin ? 'Login' : 'Register' }}</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submit">
                <v-text-field v-model="form.username" label="Username" required></v-text-field>
                <v-text-field v-model="form.password" label="Password" required type="password"></v-text-field>
                <v-btn type="submit" color="primary">{{ isLogin ? 'Log in' : 'Register' }}</v-btn>
                <v-btn color="secondary" @click="toggleForm">{{ isLogin ? 'Go to Register' : 'Go to Login' }}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({

    setup() {
      const router = useRouter();
      const isLogin = ref(true);
      const form = ref({
        username: '',
        password: ''
      });
  
      const submit = async () => {
        const path = isLogin.value ? '/api/auth/login' : '/api/auth/register';
        try {
          const response = await axios.post(path, form.value);
          if (response.data) {
            router.push({ name: 'Dashboard' }); // Redirect to a dashboard or home page
          }
        } catch (error: any) {
          alert('Error: ' + (error.response?.data?.message || error.message));
        }
      };
  
      const toggleForm = () => {
        isLogin.value = !isLogin.value;
        router.push({ name: isLogin.value ? 'Login' : 'Register' });
      };
  
      return { isLogin, form, submit, toggleForm };
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here if necessary */
  </style>
  