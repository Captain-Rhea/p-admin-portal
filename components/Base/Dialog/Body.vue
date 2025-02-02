<script setup>
const props = defineProps({
  fullHeight: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="!fullHeight ? 'max-h-[600px]' : 'max-h-[700px]'"
    class="mb-2 px-4 py-2 max-h-[600px] overflow-auto"
  >
    <slot />
  </div>
</template>
