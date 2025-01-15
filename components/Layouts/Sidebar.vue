<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// เมนูรายการ
const menuList = [
  {
    type: 'caption',
    name: 'main',
  },
  {
    type: 'menu',
    icon: 'view-dashboard-outline',
    name: 'Dashboard',
    path: '/',
  },
  {
    type: 'caption',
    name: 'website control',
  },
  {
    type: 'menu',
    icon: 'image-multiple-outline',
    name: 'Page Management',
    path: null,
    submenu: [
      {
        type: 'menu',
        icon: 'circle-medium',
        name: 'Home Page',
        path: '/page-management/home-page',
      },
    ],
  },
  {
    type: 'caption',
    name: 'storage control',
  },
  {
    type: 'menu',
    icon: 'image-multiple-outline',
    name: 'Images Storage',
    path: null,
    submenu: [
      {
        type: 'menu',
        icon: 'circle-medium',
        name: 'Page Storage',
        path: '/image-storage/page-storage',
      },
      {
        type: 'menu',
        icon: 'circle-medium',
        name: 'Blogs Storage',
        path: '/image-storage/blog-storage',
      },
    ],
  },
  {
    type: 'caption',
    name: 'users control',
  },
  {
    type: 'menu',
    icon: 'account-multiple-outline',
    name: 'Members',
    path: '/members',
  },
  {
    type: 'menu',
    icon: 'account-outline',
    name: 'my profile',
    path: '/my-profile',
  },
];

// จัดการ State ของ Submenu
const expandedMenus = ref<string[]>([]);

// ฟังก์ชันเปิด/ปิด Submenu
const toggleSubmenu = (menuName: string) => {
  if (expandedMenus.value.includes(menuName)) {
    expandedMenus.value = expandedMenus.value.filter(
      (name) => name !== menuName
    );
  } else {
    expandedMenus.value.push(menuName);
  }
};

// ตรวจสอบว่า Submenu เปิดอยู่หรือไม่
const isMenuExpanded = (menuName: string) =>
  expandedMenus.value.includes(menuName);

// ใช้ route เพื่อตรวจสอบ path
const route = useRoute();

const isActive = (path: any, submenu: Array<any> | undefined = []) => {
  if (!path && submenu) {
    return submenu.some((subItem) => route.path === subItem.path);
  }
  return path === '/' ? route.path === '/' : route.path.startsWith(path);
};
</script>

<template>
  <div class="w-[250px] px-4 flex flex-col">
    <div class="py-8">
      <LogoComponentRheaSemi class="w-[180px] mx-auto" />
    </div>

    <!-- Menu List -->
    <div class="space-y-1 flex-1 overflow-auto">
      <div v-for="(item, index) in menuList" :key="index">
        <!-- Caption -->
        <div
          v-if="item.type === 'caption'"
          class="text-white/40 py-2 uppercase text-xs mt-4"
        >
          {{ item.name }}
        </div>

        <!-- Menu -->
        <div v-else-if="item.type === 'menu'">
          <!-- เมนูที่มี Submenu -->
          <div
            v-if="item.submenu"
            @click="toggleSubmenu(item.name)"
            :class="{
              'text-white hover:bg-slate-800': isActive(null, item.submenu),
              'text-white/60 hover:bg-slate-800': !isActive(null, item.submenu),
            }"
            class="flex items-center gap-2 w-full bg-slate-800/80 p-2 rounded-lg cursor-pointer"
          >
            <v-icon>mdi-{{ item.icon }}</v-icon>
            <div class="flex-1">{{ item.name }}</div>
            <v-icon>
              mdi-chevron-{{ isMenuExpanded(item.name) ? 'up' : 'down' }}
            </v-icon>
          </div>

          <!-- เมนูที่ไม่มี Submenu -->
          <NuxtLink
            v-else
            :to="item.path"
            :class="{
              'bg-primary text-white hover:bg-primary': isActive(item.path),
            }"
            class="text-white/60 flex items-center gap-2 w-full bg-slate-800/50 p-2 rounded-lg hover:text-white/80 hover:bg-slate-800"
          >
            <v-icon>mdi-{{ item.icon }}</v-icon>
            <div class="capitalize">{{ item.name }}</div>
          </NuxtLink>

          <!-- Submenu -->
          <transition name="fade-slide" mode="out-in">
            <div
              v-if="item.submenu && isMenuExpanded(item.name)"
              class="overflow-hidden"
            >
              <div
                class="mt-2 space-y-1"
                :style="{
                  maxHeight: isMenuExpanded(item.name) ? '200px' : '0',
                  transition: 'max-height 0.3s ease-out',
                }"
              >
                <NuxtLink
                  v-for="(subItem, subIndex) in item.submenu"
                  :key="subIndex"
                  :to="subItem.path"
                  :class="{
                    'bg-primary text-white hover:bg-primary': isActive(
                      subItem.path
                    ),
                  }"
                  class="text-white/60 flex items-center gap-2 w-full bg-slate-800/50 p-2 rounded-lg hover:text-white/80 hover:bg-slate-800"
                >
                  <v-icon>mdi-{{ subItem.icon }}</v-icon>
                  <div class="capitalize">{{ subItem.name }}</div>
                </NuxtLink>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-white/60 text-xs pt-8 pb-4">Powered By RHEA SOLUTION</div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
