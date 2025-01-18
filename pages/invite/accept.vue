<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';
import { useMembers } from '~/components/Api/useMembers';

useHead({
  titleTemplate: 'Invite Confirmation - %s',
});

definePageMeta({
  layout: 'blank',
});

const { isLogin } = useAuth();
const { memberInviteVerify } = useMembers();
const appStore = useAppStore();

const route = useRoute();
const refCode: any = route.query.ref_code || '';
const displayStatus = ref<string>('no-key');

const recipientEmail = ref<string>();
const role = ref<string>();

onMounted(async () => {
  if (refCode === '') {
    displayStatus.value = 'no-key';
    appStore.enableApp();
  } else {
    await checkLogin();
    await checkMemberInviteVerify();
    appStore.enableApp();
  }
});

const checkMemberInviteVerify = async () => {
  try {
    displayStatus.value = 'success';
    const { data } = await memberInviteVerify(refCode);
    recipientEmail.value = data.recipient_email;
    role.value = data.role;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      displayStatus.value = 'expired';
    } else {
      console.error(error);
    }
  }
};

const checkLogin = async () => {
  try {
    await isLogin();
    return navigateTo('/');
  } catch (error: any) {
    // console.log(error);
  }
};
</script>

<template>
  <div class="flex inset-0 items-center justify-center w-full h-screen">
    <div v-if="displayStatus === 'no-key'" class="w-[450px] text-center">
      <v-icon size="100" color="error">mdi-link-off</v-icon>
      <h1 class="text-2xl font-semibold">No Invite link available!</h1>
      <v-btn to="/auth/sign-in" variant="tonal" class="mt-4 pl-3">
        <v-icon>mdi-chevron-left</v-icon>
        <div class="capitalize ml-2">Back</div>
      </v-btn>
    </div>

    <div v-else-if="displayStatus === 'expired'" class="w-[450px] text-center">
      <v-icon size="100" color="info">mdi-link-off</v-icon>
      <h1 class="text-2xl font-semibold">Invite link has expired!</h1>
      <v-btn
        to="/auth/sign-in"
        variant="tonal"
        color="primary"
        class="mt-4 pl-3"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="capitalize ml-2">Back</div>
      </v-btn>
    </div>

    <div v-else-if="displayStatus === 'success'" class="w-[400px]">
      <FormAcceptInvite :recipientEmail="recipientEmail" :roleName="role" />
    </div>

    <LayoutsPageLoading />
  </div>
</template>
