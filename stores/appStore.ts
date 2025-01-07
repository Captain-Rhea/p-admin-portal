import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    appStatus: false,
  }),
  actions: {
    enableApp() {
      this.appStatus = true;
    },

    disableApp() {
      this.appStatus = false;
    },
  },
});
