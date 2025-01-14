import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

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
      (error: any) => {
        if (error.response?.status === 401) {
          window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
      }
    );
  };

  addInterceptors(mainApi);

  nuxtApp.provide('mainApi', mainApi);
});
