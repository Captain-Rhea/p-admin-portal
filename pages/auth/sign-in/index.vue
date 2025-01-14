<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

useHead({
  titleTemplate: 'Sign In - %s',
});

definePageMeta({
  layout: 'blank',
});

const { login, isLogin } = useAuth();
const appStore = useAppStore();

onMounted(async () => {
  await isLogin();
  return navigateTo('/');
});

const loginForm = ref();
const email = ref<string>('');
const password = ref<string>('');
const visible = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const snackbar = ref<boolean>(false);

const handleLogin = async () => {
  const isValid = await loginForm.value.validate();
  if (isValid.valid) {
    isLoading.value = true;
    try {
      isLoading.value = true;
      await login(email.value, password.value);
      appStore.enableApp();
      navigateTo('/');
    } catch (error) {
      snackbar.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <div class="bg-white w-full h-screen grid grid-cols-12 gap-4 p-2 md:p-4">
    <div
      class="hidden lg:block lg:col-span-6 xl:col-span-7 relative overflow-hidden rounded-xl"
    >
      <v-img
        src="/images/forest-bg.jpg"
        alt="Background"
        class="absolute w-full h-full"
        cover
      />
      <div
        class="absolute top-0 z-30 w-full h-full bg-slate-900/80 flex inset-0 items-center justify-center p-4"
      >
        <div class="max-w-[400px]">
          <LogoComponentRheaWhite class="mx-auto" />
          <h2 class="text-white text-3xl mt-6 text-center">
            Admin Portal System Management
          </h2>
          <p class="text-white/50 text-center">
            The Admin Portal System Management streamlines operations by
            providing a centralized platform for managing user accounts,
            controlling permissions, monitoring activity logs, and efficiently
            organizing system resources. Designed for scalability and ease of
            use, it empowers administrators to oversee and optimize their
            systems seamlessly.
          </p>
          <p class="my-4 text-white text-center text-sm">Version 1.0.0</p>
        </div>
      </div>
    </div>

    <div
      class="col-span-12 lg:col-span-6 xl:col-span-5 relative flex inset-0 items-center justify-center rounded-lg overflow-hidden"
    >
      <div
        class="max-w-[400px] min-w-[320px] p-8 space-y-8 rounded-lg bg-white"
      >
        <div class="text-center">
          <h1 class="text-3xl font-medium">WELCOME BACK</h1>
          <p class="text-gray-500">Sign in to your account</p>
        </div>
        <div>
          <v-form ref="loginForm" :disabled="isLoading" class="space-y-2">
            <v-text-field
              v-model="email"
              :rules="[(v) => !!v || 'Email is required!']"
              label="Email Address"
              color="primary"
              variant="outlined"
              density="compact"
              required
            />

            <v-text-field
              v-model="password"
              :rules="[(v) => !!v || 'Password is required!']"
              :append-inner-icon="
                visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              :type="visible ? 'text' : 'password'"
              color="primary"
              label="Enter your password"
              density="compact"
              variant="outlined"
              required
              @keyup.enter="handleLogin()"
              @click:append-inner="visible = !visible"
            />

            <v-btn
              :loading="isLoading"
              color="primary"
              size="large"
              variant="flat"
              block
              @click="handleLogin()"
            >
              <div class="capitalize">sign in</div>
            </v-btn>
          </v-form>

          <div
            class="flex items-center justify-between gap-4 text-slate-500 my-4"
          >
            <div class="h-[1px] flex-1 bg-slate-300" />
            OR
            <div class="h-[1px] flex-1 bg-slate-300" />
          </div>

          <div class="text-sm flex items-center justify-center w-full">
            <div v-if="isLoading" class="text-slate-400 cursor-default">
              Forgot your password?
            </div>
            <NuxtLink
              v-else
              to="/auth/forgot/password"
              class="text-slate-500 hover:text-primary-base"
            >
              Forgot your password?
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <v-snackbar
      v-model="snackbar"
      color="#ffffff"
      location="bottom right"
      vertical
    >
      <div class="pb-2 text-red-500 text-lg font-semibold">Login Failed</div>
      <p>Invalid username or password. Please try again.</p>
      <template v-slot:actions>
        <v-btn variant="tonal" color="error" @click="snackbar = false">
          <div class="capitalize">Close</div>
        </v-btn>
      </template>
    </v-snackbar>

    <LayoutsPageLoading />
  </div>
</template>
