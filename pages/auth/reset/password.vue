<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

useHead({
  titleTemplate: 'Reset Password - %s',
});

definePageMeta({
  layout: 'blank',
});

const appStore = useAppStore();

const { forgotPasswordVerifyKey, forgotPasswordReset } = useAuth();

const route = useRoute();
const recipientEmail = ref<string | null>(null);
const resetKey: any = route.query.reset_key || '';

const displayStatus = ref<string>('no-key');

const password = ref<string>('');
const visible = ref<boolean>(false);

const passwordConfirm = ref<string>('');
const visibleConfirm = ref<boolean>(false);

const isLoading = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarTitle = ref<string>('');
const snackbarMessage = ref<string>('');

const resetForm = ref();

onMounted(async () => {
  if (resetKey === '') {
    displayStatus.value = 'no-key';
    appStore.enableApp();
  } else {
    try {
      const response = await forgotPasswordVerifyKey(resetKey);
      displayStatus.value = 'success';

      recipientEmail.value = response.data.recipient_email;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        displayStatus.value = 'expired';
      } else {
        console.error(error);
        snackbar.value = true;
        snackbarTitle.value = 'Error';
        snackbarMessage.value =
          'An unexpected error occurred while verifying the reset key.';
      }
    } finally {
      appStore.enableApp();
    }
  }
});

const handleNewPassword = async () => {
  if (password.value !== passwordConfirm.value) {
    snackbar.value = true;
    snackbarTitle.value = 'Password Mismatch';
    snackbarMessage.value = 'Passwords do not match. Please try again.';
    return;
  }

  const isValid = await resetForm.value.validate();
  if (isValid.valid) {
    try {
      isLoading.value = true;
      await forgotPasswordReset(recipientEmail.value, resetKey, password.value);
      navigateTo('/auth/sign-in');
    } catch (error: any) {
      console.error(error);
      snackbar.value = true;
      snackbarTitle.value = 'Reset Failed';
      snackbarMessage.value =
        error.response?.data?.message ||
        'An error occurred while resetting the password.';
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <div class="flex inset-0 items-center justify-center w-full h-screen">
    <div
      v-if="displayStatus === 'no-key'"
      class="max-w-[500px] min-w-[320px] text-center"
    >
      <v-icon size="100" color="error">mdi-link-off</v-icon>
      <h1 class="text-2xl font-semibold">No reset key available!</h1>
      <v-btn to="/auth/sign-in" variant="tonal" class="mt-4 pl-3">
        <v-icon>mdi-chevron-left</v-icon>
        <div class="capitalize ml-2">Back</div>
      </v-btn>
    </div>

    <div
      v-else-if="displayStatus === 'expired'"
      class="max-w-[500px] min-w-[320px] text-center"
    >
      <v-icon size="100" color="info">mdi-link-off</v-icon>
      <h1 class="text-2xl font-semibold">Reset key has expired!</h1>
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

    <div
      v-else-if="displayStatus === 'success'"
      class="max-w-[450px] min-w-[320px]"
    >
      <div class="text-center">
        <v-icon size="100" color="info">mdi-lock-reset</v-icon>
        <h1 class="text-2xl font-semibold">Create New Password</h1>
      </div>
      <div class="px-4 py-3 rounded font-semibold bg-slate-100 my-4 flex gap-2">
        <div>Email:</div>
        <div class="truncate">
          {{ recipientEmail || '-' }}
        </div>
      </div>
      <div>
        <v-form ref="resetForm" :disabled="isLoading" class="space-y-2">
          <v-text-field
            v-model="password"
            :rules="[
              (v) => !!v || 'New Password is required!',
              (v) =>
                (v && v.length >= 6) ||
                'Password must be at least 6 characters!',
            ]"
            :append-inner-icon="
              visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="visible ? 'text' : 'password'"
            color="primary"
            label="Enter your new password"
            density="compact"
            variant="outlined"
            required
            @click:append-inner="visible = !visible"
          />

          <v-text-field
            v-model="passwordConfirm"
            :rules="[
              (v) => !!v || 'Confirm Password is required!',
              (v) =>
                (v && v.length >= 6) ||
                'Password must be at least 6 characters!',
            ]"
            :append-inner-icon="
              visibleConfirm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="visibleConfirm ? 'text' : 'password'"
            color="primary"
            label="Confirm password"
            density="compact"
            variant="outlined"
            required
            @keyup.enter="handleNewPassword()"
            @click:append-inner="visibleConfirm = !visibleConfirm"
          />

          <div class="text-center">
            <v-btn
              color="primary"
              variant="tonal"
              :loading="isLoading"
              @click="handleNewPassword()"
            >
              <div class="capitalize">Confirm New Password</div>
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      color="white"
      location="bottom right"
      vertical
    >
      <div :class="`text-lg font-semibold text-red-500`">
        {{ snackbarTitle }}
      </div>
      <div class="text-slate-500">
        {{ snackbarMessage }}
      </div>
      <template v-slot:actions>
        <v-btn variant="tonal" @click="snackbar = false">
          <div class="capitalize">Close</div>
        </v-btn>
      </template>
    </v-snackbar>

    <LayoutsPageLoading />
  </div>
</template>
