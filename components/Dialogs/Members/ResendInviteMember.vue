<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

interface PropsData {
  recipientEmail: string;
  roleId: number;
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
const emit = defineEmits(['update:isDialog', 'onSuccess']);

const { sendMemberInvite } = useMembers();

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleConfirmAction = async () => {
  try {
    isLoading.value = true;
    await sendMemberInvite(
      props.actionData.recipientEmail,
      props.actionData.roleId
    );
    snackbar.value = {
      show: true,
      message: 'Invite has been resent successfully!',
      color: 'success',
    };
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to resend the invite. Please try again.',
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
      <BaseDialogTitle>Resend Invite</BaseDialogTitle>
      <BaseDialogDescription>
        Are you sure you want to resend the invite to this member? Once resent,
        the member will receive a new invitation email to access their account.
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
          color="primary"
          flat
          @click="handleConfirmAction"
        >
          <div class="capitalize">resend</div>
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
