<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMembers } from '~/components/Api/useMembers';

interface Role {
  role_id: number;
  name: string;
  description: string;
}

interface Status {
  id: number;
  name: string;
}

interface UserInfo {
  avatar_base_url: string | null;
  avatar_id: string | null;
  avatar_lazy_url: string | null;
  phone: string;
}

interface UserInfoTranslation {
  first_name: string;
  last_name: string;
  nickname: string;
  language_code: string;
  updated_at: string;
}

interface UserData {
  created_at: string;
  updated_at: string;
  email: string;
  user_id: number;
  roles: Role[];
  status: Status;
  user_info: UserInfo;
  user_info_translation: UserInfoTranslation[];
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const { getMembers } = useMembers();

const headers = ref<any>([
  {
    title: 'Users',
    align: 'start',
    sortable: false,
    key: 'user',
  },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'roles' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'action' },
]);

const desserts = ref<any[]>([]);

const handleGetMembers = async () => {
  try {
    const response = await getMembers();
    desserts.value = response.data.data;
  } catch (error: any) {
    console.error(error.response);
  }
};

onMounted(async () => {
  await handleGetMembers();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mt-4 mb-2 px-2">
      <div class="flex-1">
        <h1 class="text-3xl">Members</h1>
      </div>
      <div class="flex-1 flex items-center justify-end">
        <v-btn color="primary" class="pl-3" flat>
          <v-icon>mdi-plus</v-icon>
          <div class="capitalize ml-2">create</div>
        </v-btn>
      </div>
    </div>

    <!-- แสดง v-data-table -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      hide-default-footer
      item-value="user_id"
      class="border-b"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="py-3">
            <div class="flex">
              <v-avatar color="primary" class="mr-3">
                <v-img
                  v-if="item.user_info.avatar_base_url"
                  :src="item.user_info.avatar_base_url"
                  :lazy-src="item.user_info.avatar_lazy_url"
                />
                <span v-else class="text-2xl">
                  {{ item.user_info_translation[0].nickname[0] }}
                </span>
              </v-avatar>

              <div
                v-for="(info, index) in item.user_info_translation"
                :key="`info-${index}`"
              >
                <div v-if="info.language_code === 'th'">
                  <div class="font-semibold truncate">{{ info.nickname }}</div>
                  <div class="text-slate-500 truncate">
                    {{ info.first_name }}
                    {{ info.last_name }}
                  </div>
                </div>
              </div>
            </div>
          </td>

          <td>{{ item.email }}</td>

          <td>
            <div class="flex items-center gap-2">
              <v-icon
                v-if="item.roles[0].role_id === 1"
                class="text-purple-500"
              >
                mdi-creation-outline
              </v-icon>
              <v-icon
                v-else-if="item.roles[0].role_id === 2"
                class="text-purple-500"
              >
                mdi-crown-outline
              </v-icon>
              <v-icon v-else class="text-blue-500">mdi-account-outline</v-icon>
              <div class="capitalize">{{ item.roles[0].name }}</div>
            </div>
          </td>

          <td>
            <div class="capitalize">
              {{ item.status.name }}
            </div>
          </td>

          <td>Actions</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
