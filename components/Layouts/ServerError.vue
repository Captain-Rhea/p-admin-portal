<script setup lang="ts">
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();
</script>

<template>
  <div
    v-if="appStore.serverError"
    class="fixed z-50 w-full h-screen bg-slate-100 flex inset-0 items-center justify-center"
  >
    <div class="max-w-[500px] text-center p-6">
      <LogoComponentCatSleep class="w-[200px] mx-auto" />
      <div class="text-4xl text-slate-800 font-semibold">
        Service Unavailable
      </div>
      <div class="text-slate-500">
        The server encountered an error. We are working to resolve this issue.
        Please try again later.
      </div>
    </div>
  </div>
</template>
