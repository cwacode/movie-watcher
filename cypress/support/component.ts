import { mount as baseMount } from 'cypress/vue';
import { createRouter, createWebHistory} from 'vue-router';
import { routes } from '../../frontend/src/router/router';
import { h } from 'vue';
import { createPinia } from 'pinia';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: any, options?: { global?: { plugins?: any[] } }): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  const pinia = createPinia();

  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];
  options.global.plugins.push(router, pinia);

  baseMount(() => h('div', [h(component)]), options);

  router.isReady().then(() => {
    Cypress.log({ message: 'Router initialization confirmed' });
  });
});
