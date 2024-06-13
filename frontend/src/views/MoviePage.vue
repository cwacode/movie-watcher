<template>
  <v-container fluid>
    <v-row justify="center" class="align-center my-8">
      <span class="text-h3 text-center" data-cy="Title">
        All Movies
      </span>
    </v-row>
    <!-- Sorting -->
    <v-row justify="center" class="align-center mb-4">
      <span class="text-center text-h5">
        Sorting
      </span>
    </v-row>
    <v-row justify="center" class="mb-4">
      <v-row justify="center">
        <v-btn @click="toggleSort('name')" data-cy="sort-name" variant="outlined"
          :color="sortKey === 'name' ? 'primary' : 'default'">
          Name {{ sortKey === 'name' ? (sortDesc ? '↓' : '↑') : '' }}
        </v-btn>
        <v-btn @click="toggleSort('year')" data-cy="sort-year" class="mx-4" variant="outlined"
          :color="sortKey === 'year' ? 'primary' : 'default'">
          Year {{ sortKey === 'year' ? (sortDesc ? '↓' : '↑') : '' }}
        </v-btn>
        <v-btn @click="toggleSort('genre')" data-cy="sort-genre" variant="outlined"
          :color="sortKey === 'genre' ? 'primary' : 'default'">
          Genre {{ sortKey === 'genre' ? (sortDesc ? '↓' : '↑') : '' }}
        </v-btn>
      </v-row>
    </v-row>
    <!-- All Movies -->
    <v-row justify="center">
      <v-col v-for="movie in movies" :key="movie.movie_id" cols="6" sm="4" md="3">
        <v-card elevation="5" class="text-center fill-height d-flex flex-column">
          <v-img :src="movie.image" alt="Movie image" cover></v-img>
          <v-spacer></v-spacer>
          <v-card-title class="text-h5 my-1 text-wrap pa-0" data-cy="Title">
            {{ movie.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ movie.year }} - {{ movie.genre }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-wrap" variant="outlined"
              :color="favoriteAdded[movie.movie_id] ? 'pink' : 'primary'" data-cy="add-to-favorites"
              @click="addToFavorites(movie.movie_id)">
              {{ favoriteAdded[movie.movie_id] ? 'Added' : 'Add to Favorites' }}
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
import { Movie, SortKey } from '../types';
import { useAuthStore } from '../store/authStore';

export default defineComponent({
  name: 'MoviePage',
  data() {
    return {
      movies: [] as Movie[],
      sortKey: '' as SortKey,
      sortDesc: false,
      favoriteAdded: {} as Record<number, boolean>,
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
          this.favoriteAdded[movie.movie_id] = false;
          try {
            const imagePath = `../assets/images/${movie.movie_id}.jpg`;
            const imageModule = await import(/* @vite-ignore */ imagePath);
            return { ...movie, image: imageModule.default };
          } catch (imageError) {
            console.error('Error loading image:', imageError);
            return { ...movie, image: '/images/default.jpg' };
          }
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },

    toggleSort(key: SortKey) {
      if (this.sortKey === key) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortKey = key;
        this.sortDesc = false;
      }
      this.sortMovies();
    },
    sortMovies() {
      this.movies.sort((a, b) => {
        const aValue = a[this.sortKey] || '';
        const bValue = b[this.sortKey] || '';
        let result = 0;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          result = aValue - bValue;
        } else {
          result = aValue.toString().toLowerCase().localeCompare(bValue.toString().toLowerCase());
        }
        return this.sortDesc ? -result : result;
      });
    },
    async addToFavorites(movieId: number) {
      if (!this.favoriteAdded[movieId] && this.userId) { 
        try {
          if (this.userId) {
            const response = await axios.post(`http://localhost:3000/api/list/${this.userId}`, { movieId });
            if (response.status === 201) {
              this.favoriteAdded[movieId] = true; 
              console.log('Movie added to list');
              await this.$nextTick();
            }
          } else {
            console.error('User ID is null. Cannot add to favorites.');
          }
        } catch (error) {
          console.error('Error adding movie to favorites:', error);
        }
      } else {
        console.log('Already added to favorites');
      }
    },

  }
});
</script>