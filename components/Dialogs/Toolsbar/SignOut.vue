<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';
const { resetProfile } = useMyprofileStore();

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
});

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog']);
const appStore = useAppStore();

const { logout } = useAuth();

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleConfirmAction = async () => {
  try {
    isLoading.value = true;
    await logout();
    appStore.disableIsLogin();
    resetProfile();
    navigateTo('/auth/sign-in');
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to sign out. Please try again.',
      color: 'error',
    };
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="400"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogTitle>Confirm Sign Out</BaseDialogTitle>
      <BaseDialogDescription>
        Are you sure you want to sign out? You will need to log in again to
        access your account.
      </BaseDialogDescription>
      <BaseDialogActions>
        <v-btn
          :disabled="isLoading"
          variant="tonal"
          @click="emit('update:isDialog', false)"
        >
          <div class="capitalize">Close</div>
        </v-btn>
        <v-btn
          :loading="isLoading"
          color="error"
          flat
          @click="handleConfirmAction"
        >
          <div class="capitalize">Sign Out</div>
        </v-btn>
      </BaseDialogActions>
    </BaseDialogCard>
  </v-dialog>

  <v-snackbar
    v-model="snackbar.show"
    color="white"
    location="bottom right"
    class="mb-4 mr-4"
    vertical
  >
    <div
      class="pb-2 text-lg font-semibold"
      :class="snackbar.color === 'error' ? 'text-red-500' : 'text-green-500'"
    >
      {{ snackbar.color === 'error' ? 'Error' : 'Success' }}
    </div>
    <p>{{ snackbar.message }}</p>
    <template v-slot:actions>
      <v-btn variant="tonal" @click="snackbar.show = false">
        <div class="capitalize">Close</div>
      </v-btn>
    </template>
  </v-snackbar>
</template>
