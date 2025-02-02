<script setup lang="ts">
import { useBlogStorage } from '~/components/Api/useBlogStorage';

const props = defineProps({
  isDialog: { type: Boolean, default: false },
});

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog', 'onSuccess']);
const { uploadImage } = useBlogStorage();

const isLoading = ref(false);
const snackbar = ref({ show: false, message: '', color: 'error' });

const imageFiles = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

const MAX_IMAGES = 6;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;

const setSnackbar = (message: string, color: 'success' | 'error') => {
  snackbar.value = { show: true, message, color };
};

const validateImageSize = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setSnackbar(
          `Image ${file.name} exceeds ${MAX_WIDTH}x${MAX_HEIGHT}px`,
          'error'
        );
        resolve(false);
      } else {
        resolve(true);
      }
    };
  });
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const files = Array.from(target.files);
  if (imageFiles.value.length + files.length > MAX_IMAGES) {
    setSnackbar(`You can only upload up to ${MAX_IMAGES} images`, 'error');
    return;
  }

  for (const file of files) {
    const isValid = await validateImageSize(file);
    if (isValid) {
      imageFiles.value.push(file);
      imagePreviews.value.push(URL.createObjectURL(file));
    }
  }

  target.value = '';
};

const removeImage = (index: number) => {
  imageFiles.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const handleUpload = async () => {
  if (!imageFiles.value.length) return;

  isLoading.value = true;
  try {
    for (const file of imageFiles.value) {
      const formData = new FormData();
      formData.append('file', file);
      await uploadImage(formData, (progress) => {
        console.log(`Upload Progress: ${progress}%`);
      });
    }

    imageFiles.value = [];
    imagePreviews.value = [];
    setSnackbar('Images uploaded successfully!', 'success');
    emit('onSuccess', true);
    emit('update:isDialog', false);
  } catch {
    setSnackbar('Failed to upload images. Please try again.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const isUploadDisabled = computed(
  () => !imageFiles.value.length || isLoading.value
);

watch(isDialog, (newVal, oldVal) => {
  if (!newVal) {
    imageFiles.value = [];
    imagePreviews.value = [];
  }
});
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="600"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogTitle>Upload Images</BaseDialogTitle>
      <BaseDialogDescription>
        You can upload up to {{ MAX_IMAGES }} images. Max size:
        {{ MAX_WIDTH }}x{{ MAX_HEIGHT }}px.
      </BaseDialogDescription>
      <BaseDialogBody>
        {{ imagePreviews }}
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(preview, index) in imagePreviews"
            :key="index"
            class="relative"
          >
            <img
              :src="preview"
              class="aspect-square rounded-md object-cover w-full"
            />

            <div
              class="absolute bg-white p-1 m-1 bottom-0 left-0 right-0 rounded-full"
            >
              <v-progress-linear :indeterminate="true" color="info" rounded />
            </div>

            <div class="absolute top-1 right-1" @click="removeImage(index)">
              <v-btn :disabled="isLoading" icon density="compact">
                <v-icon size="16">mdi-close</v-icon>
              </v-btn>
            </div>
          </div>

          <label
            v-if="imageFiles.length < MAX_IMAGES"
            :class="
              imageFiles.length === 0 ? 'col-span-3 h-[178px]' : 'aspect-square'
            "
            class="border-2 border-dashed rounded-md flex items-center justify-center text-gray-400 cursor-pointer hover:text-gray-500 hover:border-gray-400 hover:bg-gray-50"
          >
            <div class="text-center">
              <v-icon>mdi-tray-arrow-up</v-icon>
              <div class="text-sm">Browse</div>
            </div>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              multiple
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
          Close
        </v-btn>
        <v-btn
          :loading="isLoading"
          color="primary"
          flat
          :disabled="isUploadDisabled"
          @click="handleUpload"
        >
          Upload
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
