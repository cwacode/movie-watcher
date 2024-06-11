<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Movies</h1>
          <v-list>
            <v-list-item
              v-for="movie in movies"
              :key="movie.id"
            >
                <v-list-item-title>{{ movie.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ movie.releaseYear }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script lang="ts">
  export default {
    name: 'MoviePage',
    data() {
      return {
        movies: [
          { id: 1, title: 'Inception', releaseYear: '2010' },
          { id: 2, title: 'Interstellar', releaseYear: '2014' },
          { id: 3, title: 'The Dark Knight', releaseYear: '2008' }
        ]
      };
    },
  }
</script>
  