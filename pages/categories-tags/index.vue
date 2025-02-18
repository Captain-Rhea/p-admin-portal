<script setup>
useHead({
  titleTemplate: 'Categories & Tags - %s',
});

const tab = ref('categories');
const tabList = ref([
  { name: 'Categories', value: 'categories' },
  { name: 'Tags', value: 'tags' },
]);
</script>

<template>
  <div class="px-4 h-full space-y-4 flex flex-col">
    <div>
      <h1 class="text-2xl font-bold">Categories & Tags</h1>
      <p class="text-gray-600">
        Efficiently organize your website's content with Categories & Tags.
        Categories help structure both services and blog posts, making it easier
        for users to navigate and find relevant information. Tags are used
        exclusively for blog posts, allowing for better content grouping and
        discoverability.
      </p>
    </div>

    <div class="grid grid-cols-12 gap-4 h-full">
      <div class="col-span-8 h-full space-y-4">
        <div class="flex gap-2 py-2 border-y">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="
              item.value === tab
                ? 'bg-primary-base text-white font-semibold'
                : 'hover:bg-gray-300 hover:text-gray-800'
            "
            class="py-2 px-4 bg-gray-200 rounded w-[120px] text-center text-gray-500 cursor-pointer"
            @click="tab !== item.value, (tab = item.value)"
          >
            {{ item.name }}
          </div>
        </div>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="categories">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              debitis repellat facilis similique quaerat nobis alias voluptas,
              maiores, eos qui, et vitae! Deleniti quidem quas officia illum
              veritatis magnam blanditiis.
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item value="tags">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              debitis repellat facilis similique quaerat nobis alias voluptas,
              maiores, eos qui, et vitae! Deleniti quidem quas officia illum
              veritatis magnam blanditiis.
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>

      <div class="col-span-4 h-full">
        <div class="p-4 border h-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime modi
          repudiandae quam omnis enim odio excepturi quasi reprehenderit impedit
          quidem dolor, perferendis a quibusdam magni error molestiae, neque
          laudantium sint!
        </div>
      </div>
    </div>
  </div>
</template>
