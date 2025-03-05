<script setup>
import * as icons from 'lucide-vue-next';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
});

const toPascalCase = (str) => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const pascalIconName = computed(() => toPascalCase(props.iconName));

const iconComponent = computed(() => icons[pascalIconName.value] || null);

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };
  return sizes[props.size] || sizes.md;
});
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" :class="sizeClasses" />
</template>
