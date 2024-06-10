import { mount as baseMount } from 'cypress/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { routes } from '../../frontend/src/router/router';
import { h } from 'vue';


declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom mount function for Vue Components including plugins
       * @param component Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: any, options?: { global?: { plugins?: any[] } }): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });



  // Setup global plugins
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];
  options.global.plugins.push(router);

  baseMount(
    () => h(component), // Use h() from Vue to render the component
    options
  );

  // Ensure no return value to conform to Cypress command expectations
});

