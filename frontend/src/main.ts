import { createApp } from 'vue';
import router from './router/router.js';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';


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

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
