<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
);
</script>

<template>
  <div class="flex space-x-2">
    <NuxtLink
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      :to="switchLocalePath(availableLocale.code)"
      class="px-3 py-1 text-sm font-medium rounded-md focus:outline-none transition"
    >
      {{ availableLocale.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
