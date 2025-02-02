<script setup lang="ts">
import { useBlogStorage } from '~/components/Api/useBlogStorage';
import moment from 'moment';

useHead({
  titleTemplate: 'Blog Storage - %s',
});

const formatDate = (dateTime: string) => {
  return moment(dateTime).format('DD-MM-YYYY');
};

const { getImages, downloadImage } = useBlogStorage();

const imageList = ref<any[]>([]);
const searchInput = ref('');

const handleGetImageList = async () => {
  try {
    const response = await getImages('1', '10');
    imageList.value = response.data.data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

onMounted(async () => {
  await handleGetImageList();
});

const handleDownloadImage = async (storageData: any) => {
  try {
    const response = await downloadImage(storageData.storage_id);

    let fileName = storageData.image_name?.trim() || '';
    if (!fileName) {
      const now = new Date();
      fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
        2,
        '0'
      )}${String(now.getDate()).padStart(2, '0')}-${String(
        now.getHours()
      ).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(
        now.getSeconds()
      ).padStart(2, '0')}`;
    }

    fileName = fileName.replace(/\s+/g, '_').replace(/[\/\\:*?"<>|]/g, '');

    const blob = response.data;
    const file = new File([blob], `${fileName}.jpg`, { type: blob.type });

    const blobUrl = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const dialogUploadImage = ref<boolean>(false);
const handleDialogUploadImageSuccess = async (event: boolean) => {
  if (event) await handleGetImageList();
};

const dialogDeleteImage = ref<boolean>(false);
const dialogDeleteImageActionData = ref();
const handleDialogDeleteImageSuccess = async (event: boolean) => {
  if (event) await handleGetImageList();
};

const dialogPreviewImage = ref<boolean>(false);
const dialogPreviewImageActionData = ref();
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
          <v-btn color="primary" flat @click="dialogUploadImage = true">
            <v-icon>mdi-tray-arrow-up</v-icon>
            <div class="capitalize ml-2">Upload</div>
          </v-btn>
        </div>
      </div>
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
              @click="
                (dialogPreviewImage = true),
                  (dialogPreviewImageActionData = {
                    storageData: item,
                  })
              "
            >
              <v-icon size="small">mdi-arrow-expand</v-icon>
            </div>
            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-gray-800"
              @click="handleDownloadImage(item)"
            >
              <v-icon size="small">mdi-cloud-download-outline</v-icon>
            </div>

            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              <v-icon size="small">mdi-pencil-outline</v-icon>
            </div>
            <div
              class="p-1 rounded bg-gray-100 text-gray-500 cursor-pointer hover:text-red-500"
              @click="
                (dialogDeleteImage = true),
                  (dialogDeleteImageActionData = {
                    storageId: item.storage_id,
                  })
              "
            >
              <v-icon size="small">mdi-trash-can-outline</v-icon>
            </div>
          </div>
        </v-img>
        <div class="p-2 space-y-2">
          <div class="text-lg font-medium truncate">
            {{ item.image_name }}
          </div>
          <div
            class="truncate text-sm text-gray-500 flex items-center justify-between"
          >
            <div class="flex items-center gap-1">
              <v-icon>mdi-calendar-range</v-icon>
              <div>{{ formatDate(item.created_at) }}</div>
            </div>
            <div>{{ (item.base_size / (1024 * 1024)).toFixed(2) }} MB</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Image -->
    <DialogsBlogStorageUploadImage
      v-model:isDialog="dialogUploadImage"
      @onSuccess="handleDialogUploadImageSuccess"
    />

    <!-- Delete Image -->
    <DialogsBlogStorageDeleteImage
      v-model:isDialog="dialogDeleteImage"
      :actionData="dialogDeleteImageActionData"
      @onSuccess="handleDialogDeleteImageSuccess"
    />

    <!-- Preview Image -->
    <DialogsBlogStoragePreviewImage
      v-model:isDialog="dialogPreviewImage"
      :actionData="dialogPreviewImageActionData"
    />
  </div>
</template>
