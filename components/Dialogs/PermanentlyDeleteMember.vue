<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

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
const emit = defineEmits(['update:isDialog', 'onSuccess']);

const { permanentlyDeleteMember } = useMembers();

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleConfirmAction = async () => {
  try {
    isLoading.value = true;
    await permanentlyDeleteMember(props.actionData.userId);
    snackbar.value = {
      show: true,
      message: 'Member has been permanently deleted successfully!',
      color: 'success',
    };
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to permanently delete the member. Please try again.',
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
      <BaseDialogTitle>
        <div class="text-red-500">Permanently Delete Member</div>
      </BaseDialogTitle>
      <BaseDialogDescription>
        Are you sure you want to permanently delete this member? This action
        cannot be undone and all associated data will be removed permanently.
      </BaseDialogDescription>
      <BaseDialogActions>
        <v-btn
          :disabled="isLoading"
          variant="tonal"
          @click="emit('update:isDialog', false)"
        >
          <div class="capitalize">close</div>
        </v-btn>
        <v-btn
          :loading="isLoading"
          color="error"
          flat
          @click="handleConfirmAction"
        >
          <div class="capitalize">delete</div>
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
