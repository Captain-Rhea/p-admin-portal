<script setup lang="ts">
useHead({
  titleTemplate: 'Members - %s',
});

const myprofileStore = useMyprofileStore();
</script>

<template>
  <div class="space-y-12">
    <DataTableMemberList />
    <DataTableInviteMemberList v-if="!myprofileStore.isAdmin()" />
  </div>
</template>
