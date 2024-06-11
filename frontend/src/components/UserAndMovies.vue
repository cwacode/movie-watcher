<template>
    <v-container>
      <v-row>
        <v-col cols="12">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">User ID</th>
                  <th class="text-left">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.user_id">
                  <td>{{ user.user_id }}</td>
                  <td>{{ user.username }}</td>
                </tr>
              </tbody>
            </template>
        </v-col>
        <v-col cols="12">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">User ID</th>
                  <th class="text-left">Movie ID</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in userMovies" :key="entry.user_id + '-' + entry.movie_id">
                  <td>{{ entry.user_id }}</td>
                  <td>{{ entry.movie_id }}</td>
                </tr>
              </tbody>
            </template>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'UserAndMovies',
    data() {
      return {
        users: [],
        userMovies: []
      };
    },
    async mounted() {
      await this.fetchUsers();
      await this.fetchUserMovies();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async fetchUserMovies() {
        try {
          const response = await axios.get('http://localhost:3000/api/list');
          this.userMovies = response.data;
        } catch (error) {
          console.error('Error fetching user movies:', error);
        }
      }
    }
  });
  </script>
  