<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

const { isLogin } = useAuth();
const appStore = useAppStore();

const handleUserAuthentication = async () => {
  try {
    await isLogin();
  } catch (error) {
    return navigateTo('/auth/sign-in');
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
