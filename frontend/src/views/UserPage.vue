<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Users</h1>
        <v-row>
          <v-col
            v-for="user in users"
            :key="user.id"
            cols="12" sm="6" md="4"
          >
            <v-card>
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-subtitle>{{ user.email }}</v-card-subtitle>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'UserPage',
  data() {
    return {
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Carol', email: 'carol@example.com' }
      ]
    };
  },

}
</script>
