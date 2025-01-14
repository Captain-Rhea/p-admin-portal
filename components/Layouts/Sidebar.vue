<template>
  <div class="w-[280px] px-4 flex flex-col">
    <div class="py-8">
      <LogoComponentRheaSemi class="w-[180px] mx-auto" />
    </div>

    <div class="space-y-1 flex-1 overflow-auto">
      <div class="text-white/40 py-2">Caption text</div>

      <div
        class="text-white flex items-center gap-2 w-full bg-primary-base p-2 rounded-lg"
      >
        <v-icon>mdi-home</v-icon>
        <div>Menu Item</div>
      </div>

      <div
        v-for="(item, index) in 5"
        :key="index"
        class="text-white flex items-center gap-2 w-full bg-slate-800 p-2 rounded-lg"
      >
        <v-icon>mdi-home</v-icon>
        <div>Menu Item</div>
      </div>

      <div class="text-white/40 py-2">Caption text</div>

      <div
        v-for="(item, index) in 10"
        :key="index"
        class="text-white flex items-center gap-2 w-full bg-slate-800 p-2 rounded-lg"
      >
        <v-icon>mdi-home</v-icon>
        <div>Menu Item</div>
      </div>
    </div>

    <div class="text-white/60 text-xs pt-8 pb-4">Powered By RHEA SOLUTION</div>
  </div>
</template>
