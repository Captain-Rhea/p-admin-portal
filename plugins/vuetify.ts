import { createVuetify } from 'vuetify';
import { defineNuxtPlugin } from '#app';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#2563EB',
            error: '#F87171',
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
