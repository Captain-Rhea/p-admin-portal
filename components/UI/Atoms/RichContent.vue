<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'พิมพ์ข้อความที่นี่...',
  },
});

const editorRef = ref(null);
const isRichMode = ref(true);

const autoResize = () => {
  const el = editorRef.value;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};

const handleKeyDown = (event) => {
  if (!isRichMode.value) return;

  if (event.metaKey || event.ctrlKey) {
    event.preventDefault();
    if (event.key === 'b') document.execCommand('bold', false, null);
    if (event.key === 'i') document.execCommand('italic', false, null);
    if (event.key === 'u') document.execCommand('underline', false, null);
  }
};

// Function Toggle เปิด-ปิด Rich Editing
const toggleRichMode = () => {
  isRichMode.value = !isRichMode.value;
};

// ตรวจสอบว่า content ว่างเปล่าหรือไม่ (ใช้ placeholder)
const isEmpty = computed(() => {
  return !editorRef.value?.innerText.trim();
});

onMounted(() => {
  autoResize();
});
</script>

<template>
  <div class="relative w-full">
    <!-- ปุ่มเปิด-ปิด Rich Editing -->
    <button
      @click="toggleRichMode"
      class="absolute top-2 right-2 bg-gray-200 px-3 py-1 text-sm rounded-md"
    >
      {{ isRichMode ? 'ปิด Rich Mode' : 'เปิด Rich Mode' }}
    </button>

    <!-- Rich Content Editor -->
    <div
      ref="editorRef"
      contenteditable="true"
      :class="[
        'w-full min-h-[50px] text-center p-4 border border-gray-300 rounded-lg focus:outline-none resize-none overflow-hidden',
        { 'text-gray-400': isEmpty },
      ]"
      @input="autoResize"
      @keydown="handleKeyDown"
    >
      {{ isEmpty ? placeholder : '' }}
    </div>
  </div>
</template>
