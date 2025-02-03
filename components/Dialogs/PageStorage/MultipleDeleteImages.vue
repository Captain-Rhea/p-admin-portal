<script setup lang="ts">
import { usePageStorage } from '~/components/Api/usePageStorage';

interface PropsData {
  storageSelected: string;
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

const { multipleDeleteImages } = usePageStorage();

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleConfirmAction = async () => {
  try {
    isLoading.value = true;

    await multipleDeleteImages(props.actionData.storageSelected);

    const count = props.actionData.storageSelected.split(',').length;
    snackbar.value = {
      show: true,
      message: `${count} image${
        count > 1 ? 's' : ''
      } has been deleted successfully!`,
      color: 'success',
    };
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Failed to delete the images. Please try again.',
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
      <BaseDialogTitle>Delete Images</BaseDialogTitle>
      <BaseDialogDescription>
        Are you sure you want to delete
        <strong
          >{{ props.actionData.storageSelected.split(',').length }} image{{
            props.actionData.storageSelected.split(',').length > 1 ? 's' : ''
          }}</strong
        >? This action is irreversible.
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
