<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '~/stores/appStore';
import { useWindowSize } from '@vueuse/core';

const appStore = useAppStore();

const sidebarMiniMode = computed(() => appStore.sidebarMiniMode);
const sidebarDrawer = computed(() => appStore.drawer);
const { width, height } = useWindowSize();

watch(width, (newVal, oldVal) => {
  if (newVal >= 1024) {
    appStore.disableSidebarDrawer();
  } else {
    appStore.disableSidebarMiniMode();
  }
});

const menuList = [
  {
    type: 'caption',
    name: 'main',
  },
  {
    type: 'menu',
    icon: 'layout-dashboard',
    name: 'Dashboard',
    path: '/',
  },
  {
    type: 'caption',
    name: 'website control',
  },
  {
    type: 'menu',
    icon: 'layout-template',
    name: 'Website',
    path: null,
    submenu: [
      {
        type: 'menu',
        icon: 'dot',
        name: 'Home Page',
        path: '/page-management/home-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'About Us Page',
        path: '/page-management/about-us-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Services Page',
        path: '/page-management/services-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Reviews Page',
        path: '/page-management/reviews-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Blogs Page',
        path: '/page-management/blogs-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Dentist Team Page',
        path: '/page-management/dentist-team-page',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Contact Page',
        path: '/page-management/contact-page',
      },
    ],
  },
  {
    type: 'menu',
    icon: 'text-select',
    name: 'Base Sections',
    path: null,
    submenu: [
      {
        type: 'menu',
        icon: 'dot',
        name: 'Page Item',
        path: '/',
      },
    ],
  },
  {
    type: 'menu',
    icon: 'shopping-basket',
    name: 'Services',
    path: '/services',
  },
  {
    type: 'menu',
    icon: 'gift',
    name: 'Promotions',
    path: '/promotions',
  },
  {
    type: 'menu',
    icon: 'square-pen',
    name: 'Blogs',
    path: '/blogs',
  },
  {
    type: 'menu',
    icon: 'tags',
    name: 'Categories & Tags',
    path: '/categories-tags',
  },
  {
    type: 'caption',
    name: 'storage control',
  },
  {
    type: 'menu',
    icon: 'images',
    name: 'Images Storage',
    path: null,
    submenu: [
      {
        type: 'menu',
        icon: 'dot',
        name: 'Page Image Library',
        path: '/image-storage/page-storage',
      },
      {
        type: 'menu',
        icon: 'dot',
        name: 'Blog Image Library',
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
    icon: 'users',
    name: 'Members',
    path: '/members',
  },
  {
    type: 'menu',
    icon: 'user',
    name: 'my profile',
    path: '/my-profile',
  },
];

const expandedMenus = ref<string[]>([]);

const toggleSubmenu = (menuName: string) => {
  if (expandedMenus.value.includes(menuName)) {
    expandedMenus.value = expandedMenus.value.filter(
      (name) => name !== menuName
    );
  } else {
    expandedMenus.value.push(menuName);
  }
};

const isMenuExpanded = (menuName: string) =>
  expandedMenus.value.includes(menuName);

const route = useRoute();

const isActive = (path: any, submenu: Array<any> | undefined = []) => {
  if (!path && submenu) {
    return submenu.some((subItem) => route.path === subItem.path);
  }
  return path === '/' ? route.path === '/' : route.path.startsWith(path);
};

const sidebarWidth = ref('w-[250px]');
const sidebarMiniHover = ref(false);

watch(
  () => appStore.sidebarMiniMode,
  (newVal, oldVal) => {
    if (newVal) {
      expandedMenus.value = [];
      sidebarWidth.value = 'w-[80px]';
    } else {
      sidebarWidth.value = 'w-[250px]';
    }
  }
);

const handleMiniOver = () => {
  if (sidebarMiniMode.value) {
    sidebarWidth.value = 'w-[250px]';
    sidebarMiniHover.value = true;
  }
};

const handleMiniLeave = () => {
  if (sidebarMiniMode.value) {
    sidebarWidth.value = 'w-[80px]';
    sidebarMiniHover.value = false;
    expandedMenus.value = [];
  }
};
</script>

<template>
  <div
    :class="[sidebarWidth, sidebarDrawer ? 'left-0' : 'left-[-100%]']"
    class="transition-all duration-300 z-30 flex flex-col cursor-default absolute bg-slate-900 top-0 h-full lg:relative lg:left-0 overflow-hidden pl-2"
    @mouseover="handleMiniOver"
    @mouseleave="handleMiniLeave"
  >
    <div :class="sidebarMiniMode ? 'py-4' : 'py-8'" class="pr-4">
      <LogoRheaSemi
        v-if="!sidebarMiniMode || sidebarMiniHover"
        class="w-[180px] mx-auto"
      />
      <div v-else class="w-[48px] h-[48px]">
        <LogoSymbol />
      </div>
    </div>

    <!-- Menu List -->
    <div class="space-y-1 flex-1 overflow-auto pl-1 pr-4">
      <div v-for="(item, index) in menuList" :key="index">
        <!-- Caption -->
        <div
          v-if="item.type === 'caption'"
          :class="
            !sidebarMiniMode || sidebarMiniHover ? 'mt-4' : 'text-center mt-0'
          "
          class="text-white/40 py-2 uppercase text-xs"
        >
          {{ !sidebarMiniMode || sidebarMiniHover ? item.name : '------' }}
        </div>

        <!-- Menu -->
        <div v-else-if="item.type === 'menu'">
          <!-- เมนูที่มี Submenu -->
          <div
            v-if="item.submenu"
            @click="
              (!sidebarMiniMode || sidebarMiniHover) && toggleSubmenu(item.name)
            "
            :class="{
              ' text-white hover:bg-slate-800': isActive(null, item.submenu),
              'text-white/60 hover:bg-slate-800': !isActive(null, item.submenu),
              'justify-center': sidebarMiniMode,
            }"
            class="flex items-center gap-2 w-full bg-slate-800/80 p-2 rounded cursor-pointer hover:text-white/80"
          >
            <UIAtomsIcon :iconName="item.icon" size="sm" />

            <div v-if="!sidebarMiniMode || sidebarMiniHover" class="flex-1">
              {{ item.name }}
            </div>

            <div v-if="!sidebarMiniMode || sidebarMiniHover">
              <UIAtomsIcon
                v-if="isMenuExpanded(item.name)"
                iconName="chevron-up"
                size="xs"
              />
              <UIAtomsIcon v-else iconName="chevron-down" size="xs" />
            </div>
          </div>

          <!-- เมนูที่ไม่มี Submenu -->
          <NuxtLink
            v-else
            :to="item.path"
            :class="{
              'bg-primary-800 text-red hover:bg-primary-800 hover:text-white cursor-default':
                isActive(item.path),
              'justify-center': sidebarMiniMode && !sidebarMiniHover,
              'justify-start': sidebarMiniHover,
            }"
            class="text-white flex items-center gap-2 w-full bg-slate-800 p-2 rounded hover:text-white hover:bg-slate-800"
          >
            <UIAtomsIcon :iconName="item.icon" size="sm" />
            <div v-if="!sidebarMiniMode || sidebarMiniHover" class="capitalize">
              {{ item.name }}
            </div>
          </NuxtLink>

          <!-- Submenu -->
          <transition name="fade-slide" mode="out-in">
            <div
              v-if="item.submenu && isMenuExpanded(item.name)"
              class="overflow-hidden pb-4"
            >
              <div
                class="mt-2 space-y-1"
                :style="{
                  maxHeight: isMenuExpanded(item.name) ? '100%' : '0',
                  transition: 'max-height 0.3s ease-out',
                }"
              >
                <NuxtLink
                  v-for="(subItem, subIndex) in item.submenu"
                  :key="subIndex"
                  :to="subItem.path"
                  :class="{
                    'bg-primary-800 text-white/100 hover:bg-primary-800 hover:text-white/100 cursor-default':
                      isActive(subItem.path),
                  }"
                  class="text-white/60 flex items-center gap-2 w-full p-2 rounded-lg hover:text-white/80 hover:bg-slate-800/50"
                >
                  <UIAtomsIcon :iconName="subItem.icon" size="xs" />
                  <div class="capitalize">{{ subItem.name }}</div>
                </NuxtLink>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="!sidebarMiniMode || sidebarMiniHover"
      class="text-white/60 text-xs pt-8 pb-4 pr-4 pl-1"
    >
      Powered By RHEA SOLUTION
    </div>
  </div>
  <div
    v-if="sidebarDrawer"
    class="fixed bg-slate-900/30 z-20 left-0 top-0 w-full h-screen"
    @click="appStore.toggleSidebarDrawer()"
  />
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
