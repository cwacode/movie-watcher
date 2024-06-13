import { mount as baseMount } from 'cypress/vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../frontend/src/router/router';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../../frontend/src/store/authStore';
import { createVuetify } from 'vuetify';
import { h } from 'vue';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mount a Vue component with all plugins configured.
       */
      mountWithAuth(component: any, userId?: number, options?: any): Chainable<Element>
      removeFavorite(userId: number, movieId: number): Chainable<Element>
      addFavorite(userId: number, movieId: number): Chainable<Element>
    }
  }
}
Cypress.Commands.add('removeFavorite', (userId, movieId) => {
    cy.request({
        method: 'DELETE',
        url: `/api/list/${userId}/${movieId}`,
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 200) {
            console.log(`Movie removed from favorites: ${movieId}`);
        } else {
            console.error(`Failed to remove movie from favorites: ${response.status}`);
        }
    });
});

Cypress.Commands.add('addFavorite', (userId, movieId) => {
    cy.request({
        method: 'POST',
        url: `/api/list/${userId}`,
        body: { movieId },
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 201) {
            console.log(`Movie added to favorites: ${movieId}`);
        } else {
            console.error(`Failed to add movie to favorites: ${response.status}`);
        }
    });
});

Cypress.Commands.add('mountWithAuth', (component, userId = 3, options = {}) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  
  const pinia = createPinia();
  setActivePinia(pinia);

  const authStore = useAuthStore();
  authStore.$patch({
    isLoggedIn: true,
    userId: userId
  });

  const vuetify = createVuetify({
    components,
    directives,
  });
  options.global = {
    plugins: [router, pinia, vuetify, ...(options.global?.plugins || [])],
    ...options.global
  };

  baseMount(() => h('div', [h(component)]), options);

  router.isReady().then(() => {
    Cypress.log({ message: 'Router and store initialization confirmed' });
  });
});
