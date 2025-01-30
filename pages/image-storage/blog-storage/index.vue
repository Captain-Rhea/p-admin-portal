<script setup lang="ts">
import { ref } from 'vue';
import { useBlogStorage } from '~/components/Api/useBlogStorage';

useHead({
  titleTemplate: 'Blog Storage - %s',
});

const { uploadImage } = useBlogStorage();

const searchInput = ref('');
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const imageList = ref<any[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

const handleGetImageList = async () => {
  try {
    // const response = await getImageList();
    // imageList.value = response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
    imagePreview.value = URL.createObjectURL(target.files[0]);
  }
};

const handleUploadImage = async () => {
  if (!imageFile.value) {
    console.log('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', imageFile.value);

  try {
    const response = await uploadImage(formData);
    console.log('Upload Success:', response);
    await handleGetImageList();
    imageFile.value = null;
    imagePreview.value = null;
  } catch (error) {
    console.log('Upload Error:', error);
  }
};

const openFileInput = () => {
  fileInputRef.value?.click();
};

const dialogDeleteImage = ref<boolean>(false);
const dialogDeleteImageActionData = ref();
const handleDialogDeleteImageSuccess = async (event: boolean) => {
  if (event) await handleGetImageList();
};

// ดึงรายการภาพเริ่มต้น
// handleGetImageList();
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Images Storage</h1>
      <p class="text-gray-600">
        This page displays all images used in blog posts. You can view, search,
        upload, and manage images related to the blog here.
      </p>
    </div>

    <div class="bg-white sticky top-[-8px] z-10">
      <div class="border-b mb-4 flex items-center justify-between py-2">
        <div class="min-w-[400px]">
          <v-text-field
            v-model="searchInput"
            append-inner-icon="mdi-magnify"
            density="compact"
            placeholder="Search by name"
            variant="outlined"
            color="primary"
            hide-details
            single-line
          />
        </div>
        <div>
          <v-btn color="primary" flat @click="openFileInput">
            <v-icon>mdi-tray-arrow-up</v-icon>
            <div class="capitalize ml-2">Upload</div>
          </v-btn>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>
    </div>

    <div v-if="imagePreview" class="mb-4 flex items-center gap-4">
      <img
        :src="imagePreview"
        alt="Preview"
        class="w-32 h-32 rounded-md object-cover"
      />
      <v-btn color="success" @click="handleUploadImage">Upload Image</v-btn>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="(item, index) in imageList"
        :key="index"
        class="col-span-3 rounded-lg overflow-hidden p-2 border group"
      >
        <v-img
          :src="item.base_url"
          class="rounded-md relative"
          height="180"
          cover
        >
          <div
            class="bg-white/50 m-1 p-1 rounded absolute right-2 opacity-[0%] space-y-1 transition-all duration-300 group-hover:right-0 group-hover:opacity-[100%]"
          >
            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              <v-icon size="small">mdi-arrow-expand</v-icon>
            </div>
            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              <v-icon size="small">mdi-pencil-outline</v-icon>
            </div>
            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-red-500"
              @click="dialogDeleteImage = true"
            >
              <v-icon size="small">mdi-trash-can-outline</v-icon>
            </div>
          </div>
        </v-img>
        <div class="mt-2 mb-1 text-lg font-medium truncate">
          {{ item.image_name }}
        </div>
        <div
          class="truncate text-sm text-gray-500 flex items-center justify-between"
        >
          <div class="flex items-center gap-1">
            <v-icon>mdi-calendar-range</v-icon>
            <div>{{ item.created_at }}</div>
          </div>
          <div>{{ (item.base_size / 1024).toFixed(2) }} KB</div>
        </div>
      </div>
    </div>

    <!-- Delete Image -->
    <DialogsBlogStorageDeleteImage
      v-model:isDialog="dialogDeleteImage"
      :actionData="dialogDeleteImageActionData"
      @onSuccess="handleDialogDeleteImageSuccess"
    />
  </div>
</template>
