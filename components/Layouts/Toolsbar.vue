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
  async (newValue, oldValue) => {
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
    <div>
      <v-icon>mdi-menu-open</v-icon>
    </div>

    <div class="flex items-center gap-4">
      <BaseFullScreenAction />
      <BaseProfileMenu />
    </div>
  </div>
</template>
