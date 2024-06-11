import { createApp } from 'vue';
import router from './router/router.ts';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/authStore.ts';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

router.afterEach((to) => {
  const authStore = useAuthStore();
  authStore.updateRoute(to.path);
});


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
