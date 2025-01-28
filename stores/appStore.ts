import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    serverError: false,
    appStatus: false,
    sidebarMiniMode: false,
    isLogin: false,
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

    toggleSidebarMiniMode() {
      this.sidebarMiniMode = !this.sidebarMiniMode;
    },

    enableIsLogin() {
      this.isLogin = true;
    },

    disableIsLogin() {
      this.isLogin = false;
    },
  },
});
