<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<template>
  <button
    @click="$emit('click')"
    class="px-4 py-2 rounded-md text-lg text-white border border-blue-800 tracking-widest transition duration-300 bg-gradient-to-r from-blue-800 to-blue-500 hover:border-white/30"
  >
    <slot>CTA Button</slot>
  </button>
</template>
