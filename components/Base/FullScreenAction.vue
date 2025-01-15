<script setup lang="ts">
import { ref } from 'vue';

// สถานะปัจจุบันว่าอยู่ใน Full Screen หรือไม่
const isFullScreen = ref(false);

// ฟังก์ชัน Toggle Full Screen
const toggleFullScreen = () => {
  if (isFullScreen.value) {
    // ออกจาก Full Screen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    isFullScreen.value = false;
  } else {
    // เข้าสู่ Full Screen
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
    isFullScreen.value = true;
  }
};
</script>

<template>
  <div
    class="text-slate-500 cursor-pointer hover:text-slate-800"
    @click="toggleFullScreen"
  >
    <v-icon size="26">
      {{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
    </v-icon>
  </div>
</template>
