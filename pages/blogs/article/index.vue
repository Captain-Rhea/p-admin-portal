<script setup lang="ts">
useHead({
  titleTemplate: 'Article - %s',
});

const navigateToArticlesList = () => {
  navigateTo('/blogs');
};

const headerContent = ref<string>('');
const descriptionContent = ref<string>('');
</script>

<template>
  <div class="container flex flex-col overflow-hidden h-full text-slate-800">
    <div class="h-auto flex items-center justify-between mb-4 px-4">
      <div>
        <div
          class="flex items-stretch cursor-pointer text-slate-500 hover:text-slate-800"
          @click="navigateToArticlesList()"
        >
          <LucideChevronLeft :size="18" />
          Articles List
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="text-slate-400">Saved</div>
        <div class="bg-primary-base text-white px-3 py-1 rounded-md">
          Public
        </div>
        <div
          class="rounded text-slate-500 hover:text-slate-600 hover:bg-slate-50 p-1 cursor-pointer"
        >
          <LucideSettings2 :size="20" />
        </div>
      </div>
    </div>

    <div class="overflow-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <div class="flex items-center justify-center gap-2">
            <UIAtomsLink to="/blogs">Ethan Caldwell</UIAtomsLink>
            <span>on October 16, 2024</span>
          </div>

          <div class="max-w-[1000px] mx-auto">
            <UIAtomsHeaderContent
              v-model="headerContent"
              placeholder="Header"
              centerText
            />
          </div>

          <div class="max-w-[600px] mx-auto text-center text-xl text-slate-500">
            <UIAtomsDescriptionContent
              v-model="descriptionContent"
              placeholder="Description"
              centerText
            />
          </div>

          <div
            class="bg-slate-100 rounded-xl aspect-video flex inset-0 items-center justify-center my-6"
          >
            <div class="text-center text-slate-500">
              <LucideImage :size="50" class="mx-auto text-slate-300" />
              <div class="text-3xl">Header Image</div>
              <div>16:9</div>

              <div
                class="px-3 py-1 border rounded-md w-fit bg-white mx-auto capitalize mt-4 cursor-pointer group"
              >
                <span class="text-slate-500 group-hover:text-slate-800">
                  browse image
                </span>
              </div>

              <div
                class="px-3 py-1 border rounded-md w-fit bg-white mx-auto capitalize mt-4 cursor-pointer group"
              >
                <span class="text-slate-500 group-hover:text-slate-800">
                  browse image
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-1 relative">
          <div class="sticky top-0">6 min read</div>
        </div>

        <div class="col-span-8">
          <BaseContentEditor />
        </div>

        <div class="col-span-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          cumque quisquam. Sequi veritatis culpa similique a architecto vel
          temporibus aliquam adipisci suscipit quibusdam, at dolores, nostrum
          ratione, voluptate laboriosam alias.
        </div>
      </div>
    </div>
  </div>
</template>
