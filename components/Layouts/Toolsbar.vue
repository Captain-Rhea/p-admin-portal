<script setup lang="ts"></script>

<template>
  <div class="w-full border-b flex items-center justify-between h-[50px]">
    <div>
      <DialogsAppSearch />
    </div>

    <div class="flex items-center gap-4">
      <BaseFullScreenAction />
      <div class="text-slate-500 cursor-pointer hover:text-slate-800">
        <v-icon>mdi-bell-outline</v-icon>
      </div>
      <DialogsSignOut />
    </div>
  </div>
</template>
