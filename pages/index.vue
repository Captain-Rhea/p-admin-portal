<script setup lang="ts">
useHead({
  titleTemplate: 'Dashboard - %s',
});

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div>
    <SectionsHero />
    <SectionsSolutions />
    <SectionsAboutUs />
    <SectionsContact />
  </div>
</template>
