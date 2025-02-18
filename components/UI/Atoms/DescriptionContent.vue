<script setup lang="ts">
const props = defineProps({
  centerText: {
    type: Boolean,
    default: false,
  },
});

const text = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  }
};

watch(text, (newValue) => {
  adjustHeight();
});

const onUnfocus = () => {
  text.value = text.value.trim();
  adjustHeight();
};

onMounted(() => adjustHeight());
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="text"
    :class="[
      'w-full resize-none overflow-hidden focus:outline-none text-xl text-slate-500 placeholder:opacity-50 placeholder:text-gray-400',
      { 'text-center': props.centerText },
    ]"
    @blur="onUnfocus"
    rows="1"
    maxlength="250"
  />
</template>
