<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

const { isLogin } = useAuth();
const appStore = useAppStore();

const handleUserAuthentication = async () => {
  try {
    await isLogin();
  } catch (error: any) {
    if (error.response.status === 400) {
      return navigateTo('/auth/sign-in');
    } else {
      console.error('isLogin Error: ', error);
    }
  }
};

onMounted(async () => {
  await handleUserAuthentication();
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
