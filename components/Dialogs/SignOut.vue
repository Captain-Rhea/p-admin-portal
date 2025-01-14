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
      <v-card>
        <v-card-title class="text-h6"> Confirm Sign Out </v-card-title>

        <v-card-text>
          Are you sure you want to sign out? You will need to log in again to
          access your account.
        </v-card-text>
        <div class="flex items-center justify-between px-4 pb-2">
          <v-btn :disabled="isLoading" variant="text" @click="cancelSignOut">
            <div class="capitalize">Cancel</div>
          </v-btn>

          <v-btn
            :loading="isLoading"
            color="error"
            variant="tonal"
            @click="confirmSignOut()"
          >
            <div class="capitalize">Sign Out</div>
          </v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
