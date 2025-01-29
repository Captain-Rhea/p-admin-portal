import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    serverError: false,
    appStatus: false,
    sidebarMiniMode: false,
    drawer: false,
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

    disableSidebarMiniMode() {
      this.sidebarMiniMode = false;
    },

    toggleSidebarDrawer() {
      this.drawer = !this.drawer;
    },

    disableSidebarDrawer() {
      this.drawer = false;
    },

    enableIsLogin() {
      this.isLogin = true;
    },

    disableIsLogin() {
      this.isLogin = false;
    },
  },
});
