<script setup lang="ts">
useHead({
  titleTemplate: 'Members - %s',
});

const myprofileStore = useMyprofileStore();
</script>

<template>
  <div class="grid grid-cols-12 space-y-6">
    <div class="col-span-12">
      <DataTableMemberList />
    </div>
    <div class="col-span-12">
      <DataTableInviteMemberList v-if="!myprofileStore.isAdmin()" />
    </div>
  </div>
</template>
