<script setup lang="ts">
import { useAppStore } from '~/stores/appStore';
const appStore = useAppStore();
</script>

<template>
  <div
    v-if="!appStore.appStatus"
    class="fixed z-50 w-full h-screen bg-gray-50 flex inset-0 items-center justify-center"
  >
    <div class="text-gray-500 flex items-center gap-2">
      <UIAtomsIcon iconName="component" size="sm" class="animate-spin" />
      <span>Loading...</span>
    </div>
  </div>
</template>
