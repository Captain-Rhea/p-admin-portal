<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/components/Api/useAuth';

useHead({
  titleTemplate: 'Warning - %s',
});

definePageMeta({
  layout: 'blank',
});

const route = useRoute();

const { forceLogout } = useAuth();

const countdown = ref(5);
const progressValue = ref(100);
const showWarning = ref<string>('suspended');

onMounted(() => {
  if (route.query && route.query.case === 'suspended') {
    showWarning.value = 'suspended';
  } else if (route.query && route.query.case === 'deleted') {
    showWarning.value = 'deleted';
  } else {
    navigateTo('/auth/sign-in');
  }

  const interval = setInterval(async () => {
    countdown.value--;
    progressValue.value = (countdown.value / 5) * 100;

    if (countdown.value <= 0) {
      clearInterval(interval);
      await forceLogout();
      navigateTo('/auth/sign-in');
    }
  }, 1000);
});
</script>

<template>
  <div class="flex inset-0 items-center justify-center w-full h-screen">
    <div
      v-if="showWarning === 'suspended'"
      class="max-w-[500px] min-w-[320px] text-center"
    >
      <v-icon size="100" color="error">mdi-account-lock-outline</v-icon>
      <h1 class="text-2xl font-semibold">Your account has been suspended.</h1>
      <p>Please contact support for more information.</p>
      <v-icon class="text-gray-400 my-4">mdi-dots-horizontal</v-icon>
      <div class="max-w-[200px] mx-auto">
        <v-progress-linear
          :model-value="progressValue"
          color="error"
          height="4"
          rounded
        />
      </div>
      <p class="mt-2 text-gray-500">
        The system will log out in {{ countdown }} seconds.
      </p>
    </div>

    <div v-else class="max-w-[500px] min-w-[320px] text-center">
      <v-icon size="100" color="error">mdi-account-alert-outline</v-icon>
      <h1 class="text-2xl font-semibold">
        Your account has been temporarily deactivated.
      </h1>
      <p>Please restore your account to proceed.</p>
      <v-icon class="text-gray-400 my-4">mdi-dots-horizontal</v-icon>
      <div class="max-w-[200px] mx-auto">
        <v-progress-linear
          :model-value="progressValue"
          color="error"
          height="4"
          rounded
        />
      </div>
      <p class="mt-2 text-gray-500">
        The system will log out in {{ countdown }} seconds.
      </p>
    </div>
  </div>
</template>
