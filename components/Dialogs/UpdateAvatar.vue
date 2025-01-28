<script setup lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import { useMyMember } from '~/components/Api/useMyMember';

const { uploadAvatar } = useMyMember();
const myprofileStore: any = useMyprofileStore();

const isDialogActive = ref(false);
const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const imageUrl = ref<string | null>(null);
const croppedDataUrl = ref<string | null>(null);
const image = ref<HTMLImageElement | null>(null);
const cropper = ref<Cropper | null>(null);

const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      imageUrl.value = reader.result as string;
      await nextTick();

      if (cropper.value) {
        cropper.value.destroy();
        cropper.value = null;
      }

      if (image.value) {
        cropper.value = new Cropper(image.value, {
          aspectRatio: 1,
          viewMode: 3,
          autoCrop: true,
          scalable: false,
          zoomable: true,
          movable: true,
          crop() {
            const canvas = cropper.value?.getCroppedCanvas({
              width: 800,
              height: 800,
            });
            croppedDataUrl.value = canvas?.toDataURL('image/jpeg') || null;
          },
        });
      }
    };
    reader.readAsDataURL(file);
  }
};

const uploadImage = async () => {
  if (croppedDataUrl.value) {
    isLoading.value = true;
    const blob = await (await fetch(croppedDataUrl.value)).blob();
    const formData = new FormData();
    formData.append('file', blob, 'avatar.jpg');

    try {
      const response = await uploadAvatar(formData);

      myprofileStore.updateAvatar(
        response.data.avatar_base_url,
        response.data.avatar_lazy_url
      );

      snackbar.value = {
        show: true,
        message: 'Update avatar is successfully!',
        color: 'success',
      };
      isDialogActive.value = false;
    } catch (error) {
      snackbar.value = {
        show: true,
        message: 'Failed to update avatar. Please try again.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
};

watch(isDialogActive, async (newValue, oldValue) => {
  if (!newValue) {
    if (cropper.value) {
      cropper.value.destroy();
      cropper.value = null;
      image.value = null;
      croppedDataUrl.value = null;
      imageUrl.value = null;
    }
  }
});
</script>

<template>
  <v-dialog v-model="isDialogActive" :persistent="isLoading" max-width="600">
    <template #activator="{ props }">
      <div
        v-bind="props"
        class="absolute top-2 right-2 bg-white shadow-md p-2 rounded-full cursor-pointer group"
      >
        <v-icon class="text-gray-400 group-hover:text-gray-600">
          mdi-pencil-outline
        </v-icon>
      </div>
    </template>

    <BaseDialogCard>
      <BaseDialogTitle> Upload Avatar </BaseDialogTitle>
      <BaseDialogBody>
        <div v-if="imageUrl" class="relative overflow-hidden rounded-lg">
          <img ref="image" :src="imageUrl" alt="To be cropped" class="w-full" />
        </div>
        <label
          v-else
          for="file-input"
          class="border-2 border-dashed rounded-md flex inset-0 items-center justify-center gap-2 text-gray-400 cursor-pointer h-[200px] hover:text-gray-500 hover:border-gray-400 hover:bg-gray-50"
        >
          <v-icon>mdi-tray-arrow-up</v-icon>
          <div>Choose File</div>
          <input
            id="file-input"
            type="file"
            @change="onFileChange"
            accept="image/*"
            class="hidden"
          />
        </label>
      </BaseDialogBody>

      <BaseDialogActions>
        <v-btn
          :disabled="isLoading"
          variant="tonal"
          @click="isDialogActive = false"
        >
          <div class="capitalize">close</div>
        </v-btn>
        <v-btn
          :disabled="!croppedDataUrl || isLoading"
          :loading="isLoading"
          color="primary"
          class="pr-3"
          flat
          @click="uploadImage"
        >
          <div class="capitalize mr-2">upload</div>
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
