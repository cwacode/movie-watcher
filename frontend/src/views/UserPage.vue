<template>
  <v-container fluid>
    <v-row justify="center" class="align-center my-8">
  <v-col cols="12" class="text-center">
    <span class="text-h3">
      Favorites
    </span>
  </v-col>
  <v-col cols="12" class="text-center">
    <v-btn color="black" outlined @click="logout">
      Logout
    </v-btn>
  </v-col>
</v-row>
    <v-row justify="center">
      <v-col v-for="movie in movies" :key="movie.movie_id" cols="6" sm="4" md="3">
        <v-card elevation="5" class="text-center fill-height d-flex flex-column">
          <v-img :src="movie.image" alt="Movie image" cover></v-img>
          <v-spacer></v-spacer>
          <v-card-title class="text-h5 my-1 text-wrap pa-0">
            {{ movie.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ movie.year }} - {{ movie.genre }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-wrap" @click="removeFromFavorites(movie.movie_id)" variant="outlined" color="pink">
              Remove from Favorites
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useAuthStore } from '../store/authStore';
import { Movie } from '../types';

export default defineComponent({
  name: 'UserPage',
  components: {
    UserAndMovies
  },
  data() {
    return {
      movies: [] as Movie[]
    };
  },
  computed: {
    userId() {
      const authStore = useAuthStore();
      console.log('User ID in UserPage:', authStore.userId); // Debug log
      return authStore.userId;
    }
  },
  async mounted() {
    await this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
    if (!this.userId) {
        console.error('User ID is null. Cannot fetch favorites.');
        return;
    }
    try {
        const response = await axios.get(`http://localhost:3000/api/list/${this.userId}`);
        if (Array.isArray(response.data)) {
            this.movies = await Promise.all(response.data.map(async (movie) => {
                try {
                    const imagePath = `../assets/images/${movie.movie_id}.jpg`;
                    const imageModule = await import(/* @vite-ignore */ imagePath);
                    return {...movie, image: imageModule.default};
                } catch (imageError) {
                    console.error('Error loading image for movie:', movie.movie_id, imageError);
                    return {...movie, image: '/images/default.jpg'};  // Fallback image path
                }
            }));
        } else {
            console.error('Unexpected data format received:', response.data);
            // Consider setting an error state here to inform the user
        }
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        // Consider showing an error message to the user
    }
},



    async removeFromFavorites(movieId: number) {
      try {
        if (this.userId) {
          await axios.delete(`http://localhost:3000/api/list/${this.userId}/${movieId}`);
          this.fetchFavorites(); // Re-fetch favorites to update the list
        } else {
          console.error('User ID is null. Cannot remove from favorites.');
        }
      } catch (error) {
        console.error('Error removing movie from favorites:', error);
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push({ name: 'Login' });
    }
  }
});
</script>
