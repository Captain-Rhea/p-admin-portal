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
    icon: 'application-edit-outline',
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
    :class="[sidebarWidth, sidebarDrawer ? 'left-0' : '']"
    class="transition-all duration-300 px-4 z-30 flex flex-col cursor-default absolute bg-slate-900 top-0 h-full left-[-100%] lg:relative lg:left-0 overflow-hidden"
    @mouseover="handleMiniOver"
    @mouseleave="handleMiniLeave"
  >
    <div :class="sidebarMiniMode ? 'py-4' : 'py-8'">
      <LogoComponentRheaSemi
        v-if="!sidebarMiniMode || sidebarMiniHover"
        class="w-[180px] mx-auto"
      />
      <div v-else class="w-[48px] h-[48px]">
        <LogoComponentSymbol />
      </div>
    </div>

    <!-- Menu List -->
    <div class="space-y-1 flex-1">
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
              'text-white hover:bg-slate-800': isActive(null, item.submenu),
              'text-white/60 hover:bg-slate-800': !isActive(null, item.submenu),
              'justify-center': sidebarMiniMode,
            }"
            class="flex items-center gap-2 w-full bg-slate-800/80 p-2 rounded cursor-pointer"
          >
            <v-icon :class="{ hidden: sidebarMiniMode || sidebarMiniHover }">
              mdi-{{ item.icon }}
            </v-icon>
            <div v-if="!sidebarMiniMode || sidebarMiniHover" class="flex-1">
              {{ item.name }}
            </div>
            <v-icon v-if="!sidebarMiniMode || sidebarMiniHover">
              mdi-chevron-{{ isMenuExpanded(item.name) ? 'up' : 'down' }}
            </v-icon>
          </div>

          <!-- เมนูที่ไม่มี Submenu -->
          <NuxtLink
            v-else
            :to="item.path"
            :class="{
              'bg-primary text-white hover:bg-primary': isActive(item.path),
              'justify-center': sidebarMiniMode && !sidebarMiniHover,
              'justify-start': sidebarMiniHover,
            }"
            class="text-white/60 flex items-center gap-2 w-full bg-slate-800/50 p-2 rounded hover:text-white/80 hover:bg-slate-800"
          >
            <v-icon> mdi-{{ item.icon }} </v-icon>
            <div v-if="!sidebarMiniMode || sidebarMiniHover" class="capitalize">
              {{ item.name }}
            </div>
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
    <div
      v-if="!sidebarMiniMode || sidebarMiniHover"
      class="text-white/60 text-xs pt-8 pb-4"
    >
      Powered By RHEA SOLUTION
    </div>
  </div>
  <div
    v-if="sidebarDrawer"
    class="fixed bg-slate-900/30 z-10 left-0 top-0 w-full h-screen"
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
