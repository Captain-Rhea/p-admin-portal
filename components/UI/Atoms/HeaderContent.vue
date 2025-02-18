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
  if (newValue.includes('\n')) {
    text.value = newValue.replace('\n', ' ').trim();
  }
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
      'w-full resize-none overflow-hidden focus:outline-none text-6xl text-slate-800 font-bold placeholder:opacity-50 placeholder:text-gray-300',
      { 'text-center': props.centerText },
    ]"
    rows="1"
    maxlength="250"
    @keydown.enter.prevent
    @blur="onUnfocus"
  />
</template>
