<script setup lang="ts">
import { useAuth } from '~/components/Api/useAuth';

interface PropsData {
  userId: number;
}

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  actionData: {
    type: Object as PropType<PropsData>,
    default: null,
  },
});
const { isDialog } = toRefs(props);

const emit = defineEmits(['update:isDialog']);

const { resetPassword } = useAuth();

const isLoading = ref(false);
const dialogForm = ref();
const newPassword = ref('');
const visible = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleResetPassword = async () => {
  const isValid = await dialogForm.value.validate();
  if (isValid.valid) {
    try {
      isLoading.value = true;
      await resetPassword(props.actionData.userId, newPassword.value);
      snackbar.value = {
        show: true,
        message: 'Password has been reset successfully!',
        color: 'success',
      };
      emit('update:isDialog', false);
    } catch (error) {
      snackbar.value = {
        show: true,
        message: 'Failed to reset password. Please try again.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
};

watch(isDialog, (newValue, oldValue) => {
  if (!newValue) {
    dialogForm.value.reset();
  }
});
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="400"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogTitle>Reset Member Password</BaseDialogTitle>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-2">
          <v-text-field
            v-model="newPassword"
            :rules="[
              (v) => !!v || 'Password is required!',
              (v) =>
                (v && v.length >= 6) ||
                'Password must be at least 6 characters!',
            ]"
            :append-inner-icon="
              visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="visible ? 'text' : 'password'"
            color="primary"
            label="Enter your password"
            density="compact"
            variant="outlined"
            maxlength="250"
            required
            @keydown.enter.prevent="handleResetPassword"
            @click:append-inner="visible = !visible"
          />
        </v-form>
      </BaseDialogBody>
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
          color="primary"
          flat
          @click="handleResetPassword"
        >
          <div class="capitalize">Confirm</div>
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
