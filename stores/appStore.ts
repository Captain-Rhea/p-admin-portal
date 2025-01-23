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

    enableSidebarMiniMode() {
      this.sidebarMiniMode = true;
    },

    disableSidebarMiniMode() {
      this.sidebarMiniMode = false;
    },

    enableIsLogin() {
      this.isLogin = true;
    },

    disableIsLogin() {
      this.isLogin = false;
    },
  },
});
