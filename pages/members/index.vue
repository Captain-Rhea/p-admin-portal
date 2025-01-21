<script setup lang="ts">
useHead({
  titleTemplate: 'Members - %s',
});
</script>

<template>
  <div class="space-y-12">
    <DataTableMemberList />
    <DataTableInviteMemberList />
  </div>
</template>
