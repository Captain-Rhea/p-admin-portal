<script setup>
import { useMyMember } from '~/components/Api/useMyMember';

const { myProfile } = useMyMember();
const appStore = useAppStore();
const myprofileStore = useMyprofileStore();

onMounted(async () => {
  if (!myprofileStore.email) {
    await getMyProfile();
  }
});

watch(
  () => appStore.isLogin,
  async (newValue) => {
    if (newValue) {
      if (!myprofileStore.email) {
        await getMyProfile();
      }
    }
  }
);

const getMyProfile = async () => {
  try {
    const response = await myProfile();
    myprofileStore.fetchProfile(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
</script>

<template>
  <div class="w-full border-b flex items-center justify-between h-[60px] px-4">
    <div
      class="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden lg:block text-slate-500 hover:text-slate-800"
      @click="appStore.toggleSidebarMiniMode()"
    >
      <UIAtomsIcon
        v-if="appStore.sidebarMiniMode"
        iconName="square-chevron-right"
      />
      <UIAtomsIcon v-else iconName="square-chevron-left" />
    </div>

    <div
      class="p-2 hover:bg-gray-100 rounded-full cursor-pointer lg:hidden"
      @click="appStore.toggleSidebarDrawer()"
    >
      <UIAtomsIcon iconName="menu" />
    </div>

    <div class="flex items-center gap-4">
      <BaseFullScreenAction />
      <!-- <BaseProfileMenu /> -->
    </div>
  </div>
</template>
