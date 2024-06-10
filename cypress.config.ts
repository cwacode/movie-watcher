import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      email: "test@example.com",
      password: "securePassword"
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // Användbara för att till exempel lägga till plugins
    },
  },
});
