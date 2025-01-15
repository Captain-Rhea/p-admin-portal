<script setup lang="ts">
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();
const sidebarMiniMode = computed(() => appStore.sidebarMiniMode);
</script>

<template>
  <div class="w-full pb-2 border-b flex items-center justify-between">
    <div>
      <v-btn
        v-if="!sidebarMiniMode"
        size="small"
        icon
        flat
        @click="appStore.enableSidebarMiniMode()"
      >
        <v-icon>mdi-menu-open</v-icon>
      </v-btn>
      <v-btn
        v-else
        size="small"
        icon
        flat
        @click="appStore.disableSidebarMiniMode()"
      >
        <v-icon>mdi-menu-close</v-icon>
      </v-btn>
    </div>

    <div>
      <DialogsSignOut />
    </div>
  </div>
</template>
