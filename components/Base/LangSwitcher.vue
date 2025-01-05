<script setup>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
);
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <NuxtLink
        v-for="availableLocale in availableLocales"
        :key="availableLocale.code"
        :to="switchLocalePath(availableLocale.code)"
        class="px-3 py-1 text-sm font-medium text-white/50 bg-white/10 rounded-md hover:bg-white/60 hover:text-gray-800 focus:outline-none"
      >
        {{ availableLocale.code.toUpperCase() }}
      </NuxtLink>
    </div>
  </div>
</template>
