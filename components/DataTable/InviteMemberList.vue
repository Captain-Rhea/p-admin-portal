<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

const { getMemberInvite } = useMembers();

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

const handleGetInvites = async () => {
  try {
    const response = await getMemberInvite();
    desserts.value = response.data.data;
    console.log(response.data.data);
  } catch (error: any) {
    console.error(error.response);
  }
};

onMounted(async () => {
  await handleGetInvites();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mt-4 mb-2 px-2">
      <div class="flex-1">
        <h1 class="text-3xl">Invite Members</h1>
      </div>
      <div class="flex-1 flex items-center justify-end">
        <DialogsInviteMember />
      </div>
    </div>

    <!-- แสดง v-data-table -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="py-4">
            <div class="flex gap-1">
              <v-avatar color="primary">
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
