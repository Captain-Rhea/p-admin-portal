import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    serverError: false,
    appStatus: false,
  }),
  actions: {
    enableServerError() {
      this.serverError = true;
    },

    disableServerError() {
      this.serverError = false;
    },

    enableApp() {
      this.appStatus = true;
    },

    disableApp() {
      this.appStatus = false;
    },
  },
});
