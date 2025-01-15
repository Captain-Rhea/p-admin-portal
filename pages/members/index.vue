<script setup lang="ts">
useHead({
  titleTemplate: 'Members - %s',
});
</script>

<template>
  <div>
    <h1 class="text-3xl">Members Page</h1>
    <DataTableMemberList />
  </div>
</template>
