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
  <div class="w-full h-screen bg-slate-900 flex py-2 pr-2">
    <LayoutsSidebar />
    <main class="bg-white w-full rounded-lg">
      <slot />
    </main>

    <LayoutsPageLoading />
    <LayoutsServerError />
    <BaseGoToTopButton />
  </div>
</template>
