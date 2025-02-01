<script setup lang="ts">
import { useBlogStorage } from '~/components/Api/useBlogStorage';

interface PropsData {
  storageId: number;
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

const { deleteImage } = useBlogStorage();

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleConfirmAction = async () => {
  try {
    isLoading.value = true;

    await deleteImage(props.actionData.storageId);

    snackbar.value = {
      show: true,
      message: 'Image has been deleted successfully!',
      color: 'success',
    };
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to delete the image. Please try again.',
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
      <BaseDialogTitle>Delete Image</BaseDialogTitle>
      <BaseDialogDescription>
        Are you sure you want to delete this image? This action is irreversible.
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
