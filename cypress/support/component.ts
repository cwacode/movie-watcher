import { mount as baseMount } from 'cypress/vue';
import { createRouter, createWebHistory} from 'vue-router';
import { routes } from '../../frontend/src/router/router';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import App from '../../frontend/src/App.vue'

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: any, options?: { global?: { plugins?: any[] } }): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const app = createApp(App);
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  const pinia = createPinia();

  const vuetify = createVuetify({
    components,
    directives,
  });

  app.use(router);
  app.use(pinia);
  app.use(vuetify);

  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];
  options.global.plugins.push(router, pinia, vuetify,);

  baseMount(() => h(App, [h(component)]), {
    ...options,
    global: {
      ...options.global,
      plugins: options.global.plugins
    },
  });

  router.isReady().then(() => {
    Cypress.log({ message: 'Router initialization confirmed' });
  });
});
