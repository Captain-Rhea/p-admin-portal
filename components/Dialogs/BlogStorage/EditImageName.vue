<script setup lang="ts">
import { useBlogStorage } from '~/components/Api/useBlogStorage';

interface PropsData {
  storageData: any;
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

const { editImageName } = useBlogStorage();

const isLoading = ref(false);
const dialogForm = ref();
const defaultName = ref('');
const newImageName = ref('');

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleEditImageName = async () => {
  const isValid = await dialogForm.value?.validate();
  if (isValid?.valid && props.actionData) {
    try {
      isLoading.value = true;
      await editImageName(
        props.actionData.storageData.storage_id,
        newImageName.value
      );
      emit('onSuccess', true);
      emit('update:isDialog', false);
      snackbar.value = {
        show: true,
        message: 'Update image name successfully!',
        color: 'success',
      };
    } catch (error) {
      snackbar.value = {
        show: true,
        message: 'Failed to update image name. Please try again later.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
};

watch(isDialog, async (newValue) => {
  if (newValue && props.actionData?.storageData) {
    defaultName.value = props.actionData.storageData.image_name || '';
    newImageName.value = defaultName.value;
  } else {
    dialogForm.value?.reset();
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
      <BaseDialogTitle>Edit Image Name</BaseDialogTitle>
      <BaseDialogDescription>
        Please enter a new name for the image.
      </BaseDialogDescription>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-4">
          <div class="text-gray-600">
            Old Name: <strong>{{ defaultName }}</strong>
          </div>
          <div>
            <v-text-field
              v-model="newImageName"
              :rules="[
                (v) => !!v || 'New name is required!',
                (v) => v.length <= 250 || 'Maximum 250 characters allowed!',
              ]"
              label="Enter New Name"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
          </div>
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
          @click="handleEditImageName"
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
