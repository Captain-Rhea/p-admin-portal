import { useAuth } from '~/components/Api/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  ) {
    const token = useCookie('_app_scope');

    if (!token.value) {
      if (!to.path.includes('auth') && !to.path.includes('invite')) {
        setTimeout(() => {
          return navigateTo('/auth/sign-in');
        }, 500);
      }
    }

    if (token.value) {
      try {
        const { isLogin } = useAuth();
        await isLogin(token.value);
        if (to.path === '/auth/sign-in') {
          return navigateTo('/');
        }
      } catch (error) {
        token.value = null;
        if (to.path !== '/auth/sign-in') {
          return navigateTo('/auth/sign-in');
        }
      }
    }
  }
});
