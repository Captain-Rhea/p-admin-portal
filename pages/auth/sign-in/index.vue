<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

useHead({
  titleTemplate: 'Sign In - %s',
});

definePageMeta({
  layout: 'blank',
});

const { login } = useAuth();

const email = ref<string>('');
const password = ref<string>('');
const visible = ref<boolean>(false);
const rememberMe = ref<boolean>(false);

const handleLogin = async () => {
  try {
    const data = await login(email.value, password.value);
    console.log('User logged in:', data);
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<template>
  <div
    class="bg-gray-50 w-full h-screen flex inset-0 items-center justify-center p-4"
  >
    <div
      class="max-w-[400px] min-w-[350px] p-8 space-y-8 border rounded-lg bg-white"
    >
      <div class="w-[200px] mx-auto">
        <LogoComponentRhea />
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-medium">👋 WELCOME BACK</h1>
        <p class="text-gray-500">Sign in to your account</p>
      </div>
      <div class="space-y-2">
        <v-text-field
          v-model="email"
          label="Email Address"
          color="primary"
          variant="outlined"
          density="compact"
        />

        <v-text-field
          v-model="password"
          :append-inner-icon="
            visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :type="visible ? 'text' : 'password'"
          color="primary"
          label="Enter your password"
          density="compact"
          variant="outlined"
          @keyup:enter="handleLogin"
          @click:append-inner="visible = !visible"
        />

        <div class="text-sm flex items-center justify-between w-full">
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="rememberMe = !rememberMe"
          >
            <v-checkbox
              v-model="rememberMe"
              density="compact"
              color="primary"
              hide-details
            />
            <label class="pt-[2px] cursor-pointer">Remember Me</label>
          </div>

          <NuxtLink to="/auth/forgot/password" class="">
            Forgot Password
          </NuxtLink>
        </div>

        <v-btn
          color="primary"
          size="large"
          variant="flat"
          block
          @click="handleLogin"
        >
          <div class="capitalize">sign in</div>
        </v-btn>
      </div>
    </div>
  </div>
</template>
