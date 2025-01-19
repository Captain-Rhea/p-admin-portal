<script setup lang="ts">
useHead({
  titleTemplate: 'Members - %s',
});
</script>

<template>
  <div class="space-y-16">
    <DataTableMemberList />
    <!-- <DataTableInviteMemberList /> -->
  </div>
</template>
