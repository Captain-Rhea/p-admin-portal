import { defineStore } from 'pinia';

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    userId: '',
    displayName: '',
    pictureUrl: '',
    statusMessage: '',
    customerId: 0,
    requireConnect: true,
  }),
  actions: {
    setUserData({
      userId,
      displayName,
      pictureUrl,
      statusMessage,
    }: {
      userId: string;
      displayName: string;
      pictureUrl: string;
      statusMessage: string;
    }) {
      this.userId = userId;
      this.displayName = displayName;
      this.pictureUrl = pictureUrl;
      this.statusMessage = statusMessage;
    },
    clearUserData() {
      this.userId = '';
      this.displayName = '';
      this.pictureUrl = '';
      this.statusMessage = '';
      this.customerId = 0;
      this.requireConnect = true;
    },
    setCustomerId({ customerId }: { customerId: number }) {
      this.customerId = customerId;
    },
    setRequireConnect({ requireConnect }: { requireConnect: boolean }) {
      this.requireConnect = requireConnect;
    },
  },
});
