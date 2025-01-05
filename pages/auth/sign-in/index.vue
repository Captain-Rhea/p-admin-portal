<script setup lang="ts">
useHead({
  titleTemplate: 'Sign In - %s',
});
definePageMeta({
  layout: 'blank',
});

const rememberMe = ref<boolean>(false);
</script>

<template>
  <div
    class="bg-gray-50 w-full h-screen flex inset-0 items-center justify-center p-4"
  >
    <div
      class="max-w-[500px] min-w-[400px] p-8 space-y-8 border rounded-lg bg-white"
    >
      <div class="w-[200px] mx-auto">
        <LogoComponentRhea />
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-medium">👋 WELCOME BACK</h1>
        <p class="text-gray-500">Sign in to your account</p>
      </div>
      <div>
        <v-text-field
          label="Username"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          label="Password"
          color="primary"
          variant="outlined"
        ></v-text-field>

        <div class="text-sm">
          <v-checkbox
            v-model="rememberMe"
            color="primary"
            label="Remember Me"
            hide-details
          ></v-checkbox>

          <NuxtLink>Forgot Password</NuxtLink>
        </div>

        <v-btn
          color="primary"
          size="large"
          variant="flat"
          block
          @click="sayHello"
        >
          sign in
        </v-btn>
      </div>
    </div>
  </div>
</template>
