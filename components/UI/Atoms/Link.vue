<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <NuxtLink
    :to="to"
    :class="customClass"
    class="font-semibold text-primary-base hover:text-opacity-80"
    @click="emit('click')"
  >
    <slot />
  </NuxtLink>
</template>
