<script setup lang="ts">
import moment from 'moment';
import { useAuth } from '~/components/Api/useAuth';

const { getLoginTransaction } = useAuth();
const myprofileStore: any = useMyprofileStore();

const formatDate = (dateTime: string) => {
  return moment(dateTime).format('DD-MM-YYYY');
};
const formatTime = (dateTime: string) => {
  return moment(dateTime).format('HH:mm:ss A');
};

const dataLoading = ref<boolean>(false);

const headers = ref<any>([
  { title: 'Sign In At', sortable: false, key: 'created_at' },
  { title: 'Status', sortable: false, key: 'status' },
  { title: 'IP Address', sortable: false, key: 'ip_address' },
  { title: 'Agent', sortable: false, key: 'user_agent' },
]);

const desserts = ref<any[]>([]);
const dataTablePage = ref('1');
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
});

const handlePageChange = async (page: number) => {
  dataTablePage.value = page.toString();
  await handleGetLoginTransaction();
};

const handleGetLoginTransaction = async () => {
  try {
    dataLoading.value = true;
    const response = await getLoginTransaction(
      myprofileStore.user_id,
      dataTablePage.value
    );
    pagination.value = response.data.pagination;
    desserts.value = response.data.data;
  } catch (error: any) {
    console.error(error.response);
  } finally {
    dataLoading.value = false;
  }
};

onMounted(async () => {
  await handleGetLoginTransaction();
});
</script>

<template>
  <div>
    <div class="px-2">
      <h1 class="text-3xl capitalize">Sign In Transaction</h1>
    </div>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="pagination.per_page"
      :loading="dataLoading"
      hide-default-footer
      item-value="id"
      class="border-b"
    >
      <template v-slot:item="{ item }">
        <tr class="cursor-default">
          <td>
            <div class="flex items-center gap-1 min-w-[100px]">
              <div>{{ formatDate(item.created_at) }}</div>
              <v-icon
                v-tooltip:top="formatTime(item.created_at)"
                class="text-gray-400"
                size="18"
              >
                mdi-clock-outline
              </v-icon>
            </div>
          </td>

          <td>
            <div
              :class="
                item.status === 'success'
                  ? 'bg-green-100 text-green-600 font-medium'
                  : 'bg-red-50 text-red-400'
              "
              class="capitalize w-fit px-3 py-1 rounded-md"
            >
              {{ item.status }}
            </div>
          </td>

          <td>
            {{ item.ip_address }}
          </td>

          <td>
            {{ item.user_agent }}
          </td>
        </tr>
      </template>
    </v-data-table>

    <DataTablePagination
      :pagination="pagination"
      :onPageChange="handlePageChange"
    />
  </div>
</template>
