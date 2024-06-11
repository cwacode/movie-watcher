<template>
  <v-container fluid>
    <v-row justify="center" class="align-center my-8">
        <span class="text-h3 text-center">
          All Movies
        </span>
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
            <v-btn class="text-wrap" variant="outlined" color="pink" @click="addToFavorites(movie.movie_id)">
              Add to Favorites
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
import { Movie } from '../types';
import { useAuthStore } from '../store/authStore';


export default defineComponent({
  name: 'MoviePage',
  data() {
    return {
      movies: [] as Movie[],
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  computed: {
    userId() {
      const authStore = useAuthStore();
      return authStore.userId;
    }
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://localhost:3000/api/movies');
        this.movies = await Promise.all(response.data.map(async (movie: Movie) => {
          try {
            const imagePath = `../assets/images/${movie.movie_id}.jpg`;
            const imageModule = await import(/* @vite-ignore */ imagePath);
            return {...movie, image: imageModule.default};
          } catch (imageError) {
            console.error('Error loading image:', imageError);
            return {...movie, image: '/images/default.jpg'};
          }
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async addToFavorites(movieId: number) {
      try {
        if (this.userId) {
          const response = await axios.post(`http://localhost:3000/api/list/${this.userId}`, { movieId });
          if (response.status === 201) {
            console.log('Movie added to favorites successfully');
          }
        } else {
          console.error('User ID is null. Cannot add to favorites.');
        }
      } catch (error) {
        console.error('Error adding movie to favorites:', error);
      }
    }
  }
});
</script>


  
  