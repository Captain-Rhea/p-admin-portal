<script setup>
import { useBlogStorage } from '~/components/Api/useBlogStorage';
import moment from 'moment';

useHead({
  titleTemplate: 'Blog Storage - %s',
});

const timeAgo = (dateTime) => {
  return moment(dateTime).fromNow();
};

const { getImages, downloadImage } = useBlogStorage();

const imageList = ref([]);
const imageListLoading = ref(false);
const currentPage = ref(1);
const hasMore = ref(true);
const scrollContainer = ref(null);
const isFetching = ref(false);

const searchInput = ref('');
const enableMultipleDelete = ref(false);

const handleGetImageList = async (isLoadMore = false) => {
  if (isFetching.value) return;
  isFetching.value = true;

  try {
    imageListLoading.value = true;

    if (!isLoadMore) {
      imageList.value = [];
    }

    const response = await getImages(
      currentPage.value,
      '12',
      searchInput.value
    );

    const updatedData = response.data.data.map((item) => ({
      ...item,
      selected: false,
    }));

    if (isLoadMore) {
      imageList.value = [...imageList.value, ...updatedData];
    } else {
      imageList.value = updatedData;
    }

    const pagination = response.data.pagination;
    hasMore.value = pagination.current_page < pagination.last_page;
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    imageListLoading.value = false;
    isFetching.value = false;
  }
};

onMounted(async () => {
  await handleGetImageList();
});

const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const handleScroll = debounce(() => {
  const container = scrollContainer.value;
  if (!container || isFetching.value) return;

  const bottomReached =
    container.scrollTop + container.clientHeight >= container.scrollHeight - 50;

  if (bottomReached && hasMore.value) {
    currentPage.value += 1;
    handleGetImageList(true);
  }
}, 300);

const handleDownloadImage = async (storageData) => {
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

const dialogUploadImage = ref(false);
const handleDialogUploadImageSuccess = async (event) => {
  if (event) {
    currentPage.value = 1;
    await handleGetImageList();
  }
};

const dialogDeleteImage = ref(false);
const dialogDeleteImageActionData = ref();
const handleDialogDeleteImageSuccess = async (event) => {
  if (event) {
    currentPage.value = 1;
    await handleGetImageList();
  }
};

const dialogPreviewImage = ref(false);
const dialogPreviewImageActionData = ref();

const dialogEditImageName = ref(false);
const dialogEditImageNameActionData = ref();
const handleDialogEditImageNameSuccess = async (event) => {
  if (event) {
    currentPage.value = 1;
    await handleGetImageList();
  }
};

const dialogMultipleDeleteImages = ref(false);
const dialogMultipleDeleteImagesActionData = ref();
const handleDialogMultipleDeleteImagesSuccess = async (event) => {
  if (event) {
    multipleDeleteCount.value = 0;
    enableMultipleDelete.value = false;
    currentPage.value = 1;
    await handleGetImageList();
  }
};

watch(enableMultipleDelete, (newVal, oldVal) => {
  if (!newVal) {
    imageList.value.forEach((item) => {
      item.selected = false;
    });
    multipleDeleteCount.value = 0;
  } else {
    searchInput.value = '';
  }
});

const multipleDeleteCount = ref(0);
const handleSelectMultipleDelete = (item) => {
  if (enableMultipleDelete.value) {
    item.selected = !item.selected;
  }
  multipleDeleteCount.value = imageList.value.filter(
    (img) => img.selected
  ).length;
};

const handleConfirmSelectMultipleDelete = () => {
  dialogMultipleDeleteImages.value = true;

  const storageIds = imageList.value
    .filter((item) => item.selected)
    .map((item) => item.storage_id)
    .join(',');

  dialogMultipleDeleteImagesActionData.value = {
    storageSelected: storageIds,
  };
};

const handleSearch = async () => {
  if (searchInput.value !== '') {
    currentPage.value = 1;
    await handleGetImageList();
  }
};

watch(searchInput, async (newVal) => {
  if (newVal.trim() === '') {
    currentPage.value = 1;
    await handleGetImageList();
  }
});
</script>

<template>
  <div
    ref="scrollContainer"
    class="h-full overflow-y-auto px-4"
    @scroll="handleScroll"
  >
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
            :disabled="enableMultipleDelete"
            append-inner-icon="mdi-magnify"
            density="compact"
            placeholder="Search by name"
            variant="outlined"
            color="primary"
            hide-details
            single-line
            @keyup.enter="handleSearch"
            @click:append-inner="handleSearch"
          />
        </div>
        <div class="flex items-center gap-4">
          <div v-if="imageList.length !== 0">
            <div
              v-if="multipleDeleteCount === 0"
              :class="[!enableMultipleDelete || 'bg-red-50 text-red-500']"
              class="flex items-center gap-1 cursor-pointer px-2 py-1 text-gray-600 hover:text-red-400 hover:bg-red-50"
              @click="enableMultipleDelete = !enableMultipleDelete"
            >
              <v-icon v-if="!enableMultipleDelete">
                mdi-checkbox-blank-outline
              </v-icon>
              <v-icon v-else> mdi-checkbox-marked </v-icon>
              <div class="leading-none">Multiple Delete</div>
            </div>
            <div
              v-else
              class="flex items-center gap-1 border py-1 pl-2 pr-1 rounded cursor-default text-gray-500"
            >
              <div class="capitalize">select</div>
              <div class="font-medium">{{ multipleDeleteCount }}</div>
              <div class="capitalize border-r pr-2">
                {{ multipleDeleteCount === 1 ? 'item' : 'items' }}
              </div>
              <div
                class="capitalize cursor-pointer px-2 rounded hover:text-red-500 hover:bg-red-50"
                @click="handleConfirmSelectMultipleDelete"
              >
                delete
              </div>
              <div
                class="capitalize cursor-pointer px-2 rounded hover:text-gray-800 hover:bg-gray-100"
                @click="enableMultipleDelete = !enableMultipleDelete"
              >
                cancel
              </div>
            </div>
          </div>

          <v-btn
            :disabled="enableMultipleDelete"
            color="primary"
            flat
            @click="dialogUploadImage = true"
          >
            <v-icon>mdi-tray-arrow-up</v-icon>
            <div class="capitalize ml-2">Upload</div>
          </v-btn>
        </div>
      </div>
    </div>

    <div
      v-if="imageListLoading && imageList.length === 0"
      class="flex inset-0 items-center justify-center h-[200px] bg-gray-50 text-gray-500 rounded-lg"
    >
      <div class="flex items-center gap-2">
        <v-icon class="animate-spin">mdi-gamepad-circle-down</v-icon>
        <span>Loading...</span>
      </div>
    </div>

    <div
      v-if="!imageListLoading && imageList.length === 0"
      class="flex inset-0 items-center justify-center h-[200px] bg-gray-50 text-gray-500 rounded-lg"
    >
      <div class="capitalize cursor-default">no data available</div>
    </div>
    <div v-else class="grid grid-cols-12 gap-4">
      <div
        v-for="(item, index) in imageList"
        :key="index"
        :class="[
          item.selected ? 'bg-primary-100' : 'border',
          !enableMultipleDelete || 'cursor-pointer hover:bg-blue-50',
        ]"
        class="col-span-3 rounded-lg overflow-hidden p-2 group"
        style="border: 1px solid #007aff"
        @click="handleSelectMultipleDelete(item)"
      >
        <v-img
          :src="item.base_url"
          class="rounded-md relative"
          height="180"
          cover
        >
          <div
            v-if="enableMultipleDelete"
            class="p-2 bg-white rounded absolute top-2 right-2"
          >
            <v-icon v-if="!item.selected" size="24">
              mdi-checkbox-blank-outline
            </v-icon>
            <v-icon v-else size="24" class="text-primary-base">
              mdi-checkbox-marked
            </v-icon>
          </div>
          <div
            v-else
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
              @click="
                (dialogEditImageName = true),
                  (dialogEditImageNameActionData = {
                    storageData: item,
                  })
              "
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
          <div class="truncate text-sm text-gray-500">
            <div class="flex items-center gap-1">
              <div class="capitalize font-semibold">Uploaded :</div>
              <div>{{ timeAgo(item.created_at) }}</div>
            </div>
            <div class="flex items-center gap-1">
              <div class="capitalize font-semibold">last update :</div>
              <div>{{ timeAgo(item.updated_at) }}</div>
            </div>
            <div class="flex items-center gap-1">
              <div class="capitalize font-semibold">Size :</div>
              {{ (item.base_size / (1024 * 1024)).toFixed(2) }} MB
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 h-[100px]">
        <div
          v-if="imageListLoading && imageList.length > 0"
          class="flex inset-0 items-center justify-center text-gray-500 h-[100px]"
        >
          <div class="flex items-center gap-2">
            <v-icon class="animate-spin">mdi-gamepad-circle-down</v-icon>
            <span>Loading...</span>
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

    <!-- Edit Image Name -->
    <DialogsBlogStorageEditImageName
      v-model:isDialog="dialogEditImageName"
      :actionData="dialogEditImageNameActionData"
      @onSuccess="handleDialogEditImageNameSuccess"
    />

    <!-- Multiple Delete Images -->
    <DialogsBlogStorageMultipleDeleteImages
      v-model:isDialog="dialogMultipleDeleteImages"
      :actionData="dialogMultipleDeleteImagesActionData"
      @onSuccess="handleDialogMultipleDeleteImagesSuccess"
    />
  </div>
</template>
