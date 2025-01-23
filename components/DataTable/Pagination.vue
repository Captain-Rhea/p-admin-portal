<script setup lang="ts">
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
    }),
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});

const totalPages = computed(() => props.pagination.last_page);
const currentPage = computed(() => props.pagination.current_page);
const totalItems = computed(() => props.pagination.total);
const startItem = computed(
  () => (currentPage.value - 1) * props.pagination.per_page + 1
);
const endItem = computed(() =>
  Math.min(currentPage.value * props.pagination.per_page, totalItems.value)
);

const handlePageChange = (page: number) => {
  if (page !== currentPage.value && page > 0 && page <= totalPages.value) {
    props.onPageChange(page);
  }
};
</script>

<template>
  <div class="flex items-center justify-end space-x-4 p-4">
    <!-- Pagination Summary -->
    <div class="text-gray-600">
      {{ startItem }}-{{ endItem }} of {{ totalItems }}
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- First Page -->
      <button
        class="p-2 text-gray-500 hover:text-black disabled:text-gray-300"
        :disabled="currentPage === 1"
        @click="handlePageChange(1)"
      >
        <v-icon>mdi-chevron-double-left</v-icon>
      </button>

      <!-- Previous Page -->
      <button
        class="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </button>

      <!-- Next Page -->
      <button
        class="p-2 text-gray-500 hover:text-black disabled:text-gray-300"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </button>

      <!-- Last Page -->
      <button
        class="p-2 text-gray-500 hover:text-black disabled:text-gray-300"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(totalPages)"
      >
        <v-icon>mdi-chevron-double-right</v-icon>
      </button>
    </div>
  </div>
</template>
