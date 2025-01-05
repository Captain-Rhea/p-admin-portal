<script setup lang="ts">
useHead({
  titleTemplate: 'Sign In - %s',
});
definePageMeta({
  layout: 'blank',
});
</script>

<template>
  <div
    class="bg-gray-50 w-full h-screen flex inset-0 items-center justify-center p-4"
  >
    <div
      class="max-w-md min-w-[300px] p-8 space-y-8 border rounded-lg bg-white"
    >
      <div class="w-[200px] mx-auto">
        <LogoComponentRhea />
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-medium">👋 WELCOME BACK</h1>
        <p class="text-gray-500">Sign in to your account</p>
      </div>
      <div>Input</div>
      <div>Button</div>
    </div>
  </div>
</template>
