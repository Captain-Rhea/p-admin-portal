<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

const isDialogOpen = ref(false);
const isLoading = ref(false);

const { logout } = useAuth();

const openDialog = () => {
  isDialogOpen.value = true;
};

const cancelSignOut = () => {
  isDialogOpen.value = false;
};

const confirmSignOut = async () => {
  try {
    isLoading.value = true;
    await logout();
    return navigateTo('/auth/sign-in');
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
};
</script>

<template>
  <v-dialog v-model="isDialogOpen" :persistent="isLoading" max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        variant="text"
        @click="openDialog"
      >
        Sign Out
      </v-btn>
    </template>

    <template v-slot:default>
      <BaseDialogCard>
        <BaseDialogTitle>Confirm Sign Out</BaseDialogTitle>
        <BaseDialogDescription>
          Are you sure you want to sign out? You will need to log in again to
          access your account.
        </BaseDialogDescription>
        <BaseDialogActions>
          <v-btn :disabled="isLoading" variant="tonal" @click="cancelSignOut">
            <div class="capitalize">Close</div>
          </v-btn>
          <v-btn
            :loading="isLoading"
            color="error"
            variant="tonal"
            @click="confirmSignOut()"
          >
            <div class="capitalize">Sign Out</div>
          </v-btn>
        </BaseDialogActions>
      </BaseDialogCard>
    </template>
  </v-dialog>
</template>
