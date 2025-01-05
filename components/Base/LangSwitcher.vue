<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <!-- Dropdown สำหรับเปลี่ยนภาษา -->
  <div class="relative inline-block text-left">
    <!-- ปุ่ม Dropdown -->
    <div>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-1 w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {{ locale.toUpperCase() }}
        <LucideChevronDown class="w-4 h-4" />
      </button>
    </div>

    <!-- Dropdown Menu -->
    <div
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- รายการภาษา -->
        <NuxtLink
          v-for="availableLocale in availableLocales"
          :key="availableLocale.code"
          :to="switchLocalePath(availableLocale.code)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {{ availableLocale.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
