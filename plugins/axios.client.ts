import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const mainApi = axios.create({
    baseURL: runtimeConfig.public.mainApi,
  });

  const idpApi = axios.create({
    baseURL: runtimeConfig.public.idpApi,
  });

  const storageApi = axios.create({
    baseURL: runtimeConfig.public.storageApi,
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
      (error: any) => {
        if (error.response?.status === 401) {
          console.log('Unauthorized! Redirecting to login...');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  };

  [mainApi, idpApi, storageApi].forEach(addInterceptors);

  nuxtApp.provide('mainApi', mainApi);
  nuxtApp.provide('idpApi', idpApi);
  nuxtApp.provide('storageApi', storageApi);
});
