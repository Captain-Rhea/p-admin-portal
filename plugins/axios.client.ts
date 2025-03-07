import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const appStore = useAppStore();
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();

  const mainApi = axios.create({
    baseURL: runtimeConfig.public.mainApi,
    withCredentials: true,
  });

  const addInterceptors = (instance: any) => {
    instance.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      async (error: any) => {
        // กรณี 401: Unauthorized
        if (error.response?.status === 401) {
          if (route.path !== '/auth/sign-in') {
            return navigateTo('/auth/warning');
          }
        }

        // กรณี 401: Unauthorized
        if (error.response?.status === 403) {
          if (route.path !== '/auth/sign-in') {
            return navigateTo('/auth/warning');
          }
        }

        // กรณี 500: Internal Server Error
        if (error.response?.status === 500) {
          appStore.disableApp();
          appStore.enableServerError();
        }

        // กรณีที่เซิร์ฟเวอร์ไม่ตอบสนอง
        if (error.code === 'ECONNABORTED') {
          appStore.disableApp();
          appStore.enableServerError();
        }

        // กรณี Network Error (เช่น เซิร์ฟเวอร์ไม่สามารถเข้าถึงได้)
        if (!error.response) {
          console.error('Server not responding or network error');
          appStore.enableServerError();
        }

        return Promise.reject(error);
      }
    );
  };

  addInterceptors(mainApi);

  nuxtApp.provide('mainApi', mainApi);
});
