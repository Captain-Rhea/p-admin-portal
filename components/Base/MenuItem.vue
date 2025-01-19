<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: 'Label Name',
  },
  icon: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'default',
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <div
    :class="[
      'flex items-center gap-3 py-2 cursor-pointer text-gray-500 rounded',
      props.icon ? 'pr-3 pl-2' : 'px-3',
      props.variant === 'default'
        ? 'hover:bg-gray-50 hover:text-gray-800'
        : props.variant === 'soft-delete'
        ? 'hover:bg-red-50 hover:text-red-400'
        : props.variant === 'delete'
        ? 'hover:bg-red-400 hover:text-white'
        : 'hover:bg-gray-50 hover:text-gray-800',
    ]"
    @click="$emit('click')"
  >
    <v-icon v-if="props.icon">mdi-{{ props.icon }}</v-icon>
    <div>{{ props.label }}</div>
  </div>
</template>
