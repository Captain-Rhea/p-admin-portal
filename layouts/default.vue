<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();
const token = useCookie('_app_scope');
const route = useRoute();

onBeforeMount(async () => {
  if (!token.value) {
    if (!route.path.includes('auth') && !route.path.includes('invite')) {
      return navigateTo('/auth/sign-in');
    }
  }

  if (token.value) {
    try {
      const { isLogin } = useAuth();
      await isLogin(token.value);

      if (route.path === '/auth/sign-in') {
        return navigateTo('/');
      }
    } catch (error) {
      token.value = null;
      if (route.path !== '/auth/sign-in') {
        return navigateTo('/auth/sign-in');
      }
    }
  }

  appStore.enableApp();
});
</script>

<template>
  <div>
    <!-- <LayoutsNavbar /> -->
    <main>
      <slot />
    </main>
    <!-- <LayoutsFooter /> -->

    <LayoutsPageLoading />
    <BaseGoToTopButton />
  </div>
</template>
