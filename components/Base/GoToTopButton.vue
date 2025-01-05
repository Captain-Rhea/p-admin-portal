<template>
  <div>
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 py-4 px-2 bg-blue-600/50 text-white rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
    >
      <LucideMoveUp class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
button {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
