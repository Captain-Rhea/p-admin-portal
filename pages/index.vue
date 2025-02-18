<script setup lang="ts">
useHead({
  titleTemplate: 'Dashboard - %s',
});

const route = useRoute();
const id = route.query.id;
</script>

<template>
  <div class="px-4">
    <h1 class="text-2xl">Dashboard {{ id }}</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex voluptas
      temporibus possimus obcaecati doloribus exercitationem quis totam.
      Reprehenderit ratione nobis, accusamus cumque quidem tempora velit enim
      commodi veniam vel rerum.
    </p>
  </div>
</template>
