<script setup lang="ts">
const menuList = [
  { name: 'หน้าแรก', path: '/' },
  { name: 'โซลูชั่น', path: '/' },
  { name: 'เกี่ยวกับเรา', path: '/' },
  { name: 'ติดต่อเรา', path: '/' },
];
</script>

<template>
  <div
    class="fixed z-10 top-0 w-full py-4 dark:text-white border-b border-white/20 bg-black/20 backdrop-blur"
  >
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <div class="col-span-2 flex items-center w-full h-full">
          <LogoComponentRheaSemi class="w-[120px] h-auto" />
        </div>
        <div
          class="col-span-8 flex items-center justify-center gap-2 w-full h-full"
        >
          <NuxtLink
            v-for="(menu, index) in menuList"
            :key="index"
            :to="menu.path"
            class="w-[100px] text-gray-300 text-center tracking-wider py-2 rounded-md transition-all duration-100 hover:text-gray-50"
          >
            {{ menu.name }}
          </NuxtLink>
        </div>
        <div
          class="col-span-2 flex items-center justify-end gap-4 w-full h-full"
        >
          <BaseLangSwitcher />
          <BaseCtaButton>ปรึกษาฟรี</BaseCtaButton>
        </div>
      </div>
    </div>
  </div>
</template>
