<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

useHead({
  titleTemplate: 'Forgot Password - %s',
});

definePageMeta({
  layout: 'blank',
});

const { forgotPassword } = useAuth();

const email = ref<string>('');
const emailInputError = ref<boolean>(false);
const emailInputErrorMessage = ref<string>('');

const isLoading = ref<boolean>(false);
const isButtonDisabled = ref<boolean>(false);
const timer = ref<number>(0);
const snackbar = ref<boolean>(false);
const snackbarTitle = ref<string>('');
const snackbarMessage = ref<string>('');
const snackbarColor = ref<string>('success');

const handleSendEmail = async () => {
  const valid = /.+@.+\..+/.test(email.value);

  if (valid) {
    try {
      isLoading.value = true;
      await forgotPassword(email.value);
      isLoading.value = false;

      snackbarTitle.value = 'Send Email Successfully';
      snackbarMessage.value =
        'Reset password email has been sent successfully!';
      snackbarColor.value = 'text-green-500';
      snackbar.value = true;

      startTimer(60);
    } catch (error: any) {
      isLoading.value = false;

      snackbarTitle.value = 'Send Email Failed!';
      snackbarMessage.value =
        'Failed to send reset password email. Please try again.';
      snackbarColor.value = 'text-red-500';
      snackbar.value = true;
    }
  } else {
    emailInputError.value = true;
    emailInputErrorMessage.value = 'Enter a valid email address!';
  }
};

const startTimer = (seconds: number) => {
  timer.value = seconds;
  isButtonDisabled.value = true;

  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;
    } else {
      clearInterval(interval);
      isButtonDisabled.value = false;
    }
  }, 1000);
};

const handleClearError = async () => {
  emailInputError.value = false;
  emailInputErrorMessage.value = '';
};
</script>

<template>
  <div class="flex inset-0 items-center justify-center w-full h-screen">
    <div class="max-w-[500px] min-w-[320px] rounded-lg bg-white p-4">
      <h1 class="text-3xl font-semibold">Forgot Password</h1>
      <div class="space-y-4">
        <div class="text-slate-500">
          Enter your email to receive a reset password link.
        </div>

        <v-text-field
          v-model="email"
          :error="emailInputError"
          :error-messages="emailInputErrorMessage"
          label="Email Address"
          color="primary"
          variant="outlined"
          density="compact"
          required
          @keyup.enter="handleSendEmail()"
          @focus="handleClearError()"
        />
      </div>
      <div class="flex items-center justify-between gap-4">
        <v-btn
          to="/auth/sign-in"
          :disabled="isLoading"
          variant="text"
          class="pl-3"
        >
          <v-icon>mdi-chevron-left</v-icon>
          <div class="capitalize ml-2">Sign In</div>
        </v-btn>

        <v-btn
          :loading="isLoading"
          :disabled="isButtonDisabled"
          color="primary"
          variant="tonal"
          @click="handleSendEmail()"
        >
          <div class="capitalize mr-2">
            {{ isButtonDisabled ? `Try Again in ${timer}s` : 'Send Email' }}
          </div>
          <v-icon>mdi-email-arrow-right-outline</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      color="white"
      location="bottom right"
      vertical
    >
      <div :class="`text-lg font-semibold ${snackbarColor}`">
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
  </div>
</template>
