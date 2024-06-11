import { defineConfig } from "cypress";
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig: viteConfig,
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    // env: {
    //   username: "testuser",
    //   password: "securePassword"
    // },
    setupNodeEvents(on, config) {
     
    },
  },
});
