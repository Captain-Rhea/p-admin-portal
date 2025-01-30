<script setup lang="ts">
import { useBlogStorage } from '~/components/Api/useBlogStorage';

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
});

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog', 'onSuccess']);
const { uploadImage } = useBlogStorage();

const isLoading = ref(false);
const snackbar = ref({ show: false, message: '', color: 'error' });

const imageFile = ref<File | null>(null);
const imagePreview = computed(() =>
  imageFile.value ? URL.createObjectURL(imageFile.value) : null
);
const fileInputRef = ref<HTMLInputElement | null>(null);

const setSnackbar = (message: string, color: 'success' | 'error') => {
  snackbar.value = { show: true, message, color };
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) {
    imageFile.value = target.files[0];
  }
};

const isUploadDisabled = computed(() => !imageFile.value || isLoading.value);

const handleUpload = async () => {
  if (!imageFile.value) return;

  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('file', imageFile.value);

    await uploadImage(formData);
    imageFile.value = null;
    setSnackbar('Image uploaded successfully!', 'success');
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch {
    setSnackbar('Failed to upload the image. Please try again.', 'error');
  } finally {
    isLoading.value = false;
  }
};

watch(isDialog, async (newValue, oldValue) => {
  if (newValue) {
    imageFile.value = null;
  }
});
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="500"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogTitle>Upload Images</BaseDialogTitle>
      <BaseDialogDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </BaseDialogDescription>
      <BaseDialogBody>
        <div class="grid grid-cols-12 gap-4">
          <div v-if="imagePreview" class="col-span-4">
            <img
              :src="imagePreview"
              alt="Preview"
              class="aspect-square rounded-md object-cover"
            />
          </div>

          <label
            class="col-span-4 border-2 border-dashed rounded-md aspect-square flex inset-0 items-center justify-center gap-2 text-gray-400 cursor-pointer hover:text-gray-500 hover:border-gray-400 hover:bg-gray-50"
          >
            <div class="text-center">
              <v-icon>mdi-tray-arrow-up</v-icon>
              <div class="text-sm">Browse Image</div>
            </div>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
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
          :disabled="isUploadDisabled"
          @click="handleUpload"
        >
          <div class="capitalize">Upload</div>
        </v-btn>
      </BaseDialogActions>
    </BaseDialogCard>
  </v-dialog>

  <v-snackbar
    v-model="snackbar.show"
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
