<script setup>
import { useBlogApi } from '~/composables/pages-blogs/api';
import { useBlogState } from '~/composables/pages-blogs/state';

useHead({
  titleTemplate: 'Blogs - %s',
});

const {
  isLoadingBlogDataList,
  blogDataListPagination,
  blogDataList,
  tab,
  setTab,
  tabList,
} = useBlogState();
const { getArticles } = useBlogApi();

onMounted(async () => {
  await getArticles(
    blogDataListPagination.value.current_page.toString(),
    blogDataListPagination.value.per_page.toString()
  );
});

const navigateToArticleDetail = (articleId) => {
  console.log('Check Article Locked!');

  navigateTo(`blogs/article?id=${articleId}`);
};
</script>

<template>
  <div class="px-4 h-full space-y-4 flex flex-col">
    <div class="flex-none">
      <h1 class="text-2xl font-bold">Blog Mamagement</h1>
    </div>

    <div class="flex gap-2 py-2 border-y h-auto">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="
          item.value === tab
            ? 'bg-primary-base text-white font-semibold'
            : 'hover:bg-gray-300 hover:text-gray-800'
        "
        class="py-2 px-4 bg-gray-200 rounded w-[120px] text-center text-gray-500 cursor-pointer"
        @click="tab !== item.value, setTab(item.value)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="overflow-auto pr-4">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="articles">
          <div>Search Input</div>
          <div class="grid grid-cols-6 gap-4">
            <div
              v-for="(item, index) in 20"
              :key="`article-${index}`"
              class="col-span-3 border rounded-md p-4 flex gap-4"
            >
              <div class="w-3/6 aspect-video bg-gray-100 rounded-lg">Image</div>
              <div class="w-3/6 space-y-2">
                <div class="text-3xl font-semibold leading-snug truncate">
                  How Tech Shapes the Future of Work in 2024
                </div>
                <div class="leading-relaxed line-clamp-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                  corrupti nam quo delectus placeat ut velit nostrum, deserunt
                  itaque totam, eius quia. Nesciunt quod maiores atque
                  necessitatibus temporibus illo delectus!
                </div>
                <div
                  class="px-3 py-1 border rounded-md w-fit cursor-pointer"
                  @click="navigateToArticleDetail(1234)"
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="author">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            debitis repellat facilis similique quaerat nobis alias voluptas,
            maiores, eos qui, et vitae! Deleniti quidem quas officia illum
            veritatis magnam blanditiis.
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>
