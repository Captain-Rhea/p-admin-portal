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
  <div
    class="fixed w-full h-screen bg-slate-900 flex py-2 pr-2 pl-2 lg:pl-0 cursor-default"
  >
    <LayoutsSidebar />
    <div class="w-full flex flex-col gap-4 flex-1 rounded-lg pb-4 bg-white">
      <LayoutsToolsbar />
      <div class="w-full flex-1 overflow-auto">
        <slot />
      </div>
    </div>

    <LayoutsPageLoading />
    <LayoutsServerError />
    <BaseGoToTopButton />
  </div>
</template>
