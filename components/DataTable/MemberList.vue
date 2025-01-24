<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

const { getMembers } = useMembers();
const myprofileStore = useMyprofileStore();

const dataLoading = ref<boolean>(false);
const showDeletedMember = ref<boolean>(false);

const headers = ref<any>([
  {
    title: 'Users',
    align: 'start',
    sortable: false,
    key: 'user',
  },
  { title: 'Email', sortable: false, key: 'email' },
  { title: 'Role', sortable: false, key: 'roles' },
  { title: 'Status', sortable: false, key: 'status' },
  { title: 'Actions', align: 'center', sortable: false, key: 'action' },
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
  await handleGetMembers();
};

const handleGetMembers = async () => {
  try {
    dataLoading.value = true;
    const statusId = showDeletedMember.value ? '3' : '1,2';

    const response = await getMembers(
      dataTablePage.value,
      statusId,
      searchInput.value
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
  await handleGetMembers();
});

const handleOnSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Change Member role
const dialogsChangeRoleMember = ref<boolean>(false);
const dialogsChangeRoleMemberActionData = ref();
const handleDialogsChangeRoleMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Reset Password
const dialogsResetPasswordMember = ref<boolean>(false);
const dialogsResetPasswordActionData = ref();

// Suspend Member
const dialogsSuspendMember = ref<boolean>(false);
const dialogsSuspendActionData = ref();
const handleDialogsSuspendMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Activate Member
const dialogsActivateMember = ref<boolean>(false);
const dialogsActivateActionData = ref();
const handleDialogsActivateMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Soft Delete Member
const dialogsSoftDeleteMember = ref<boolean>(false);
const dialogsSoftDeleteActionData = ref();
const handleDialogsSoftDeleteMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Permanently Delete Member
const dialogsPermanentlyDeleteMember = ref<boolean>(false);
const dialogsPermanentlyDeleteActionData = ref();
const handleDialogsPermanentlyDeleteMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Restore Delete Member
const dialogsRestoreDeleteMember = ref<boolean>(false);
const dialogsRestoreDeleteActionData = ref();
const handleDialogsRestoreDeleteMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembers();
};

// Member Profile
const dialogsMemberProfile = ref<boolean>(false);
const dialogsMemberProfileActionData = ref();

watch(showDeletedMember, async (newVal, oldVal) => {
  await handleGetMembers();
});

const searchInput = ref('');
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const onSearchInput = async () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  if (searchInput.value === '') {
    await handleGetMembers();
  } else {
    debounceTimer = setTimeout(async () => {
      await handleGetMembers();
    }, 1500);
  }
};
</script>

<template>
  <div>
    <div class="px-2">
      <h1 class="text-3xl">Members</h1>
    </div>
    <div class="flex items-center justify-between mt-4 mb-2 px-2">
      <div class="flex-1 flex items-center space-x-4">
        <v-text-field
          v-model="searchInput"
          append-inner-icon="mdi-magnify"
          density="compact"
          placeholder="Search by email"
          variant="outlined"
          class="max-w-[350px]"
          color="primary"
          hide-details
          single-line
          @input="onSearchInput"
        />
      </div>
      <div class="flex-1 flex items-center justify-end space-x-4">
        <v-btn size="small" variant="text" @click="handleGetMembers()">
          <v-icon class="text-gray-500">mdi-refresh</v-icon>
          <div class="capitalize ml-1">refresh</div>
        </v-btn>

        <div
          v-if="myprofileStore.isCaptain() || myprofileStore.isOwner()"
          :class="!showDeletedMember || 'bg-blue-50 hover:bg-blue-100'"
          class="flex items-center gap-3 pl-2 pr-3 py-2 rounded bg-gray-50 cursor-pointer group hover:bg-gray-100"
          @click="showDeletedMember = !showDeletedMember"
        >
          <v-icon
            v-if="showDeletedMember"
            class="text-blue-500 group-hover:text-blue-600"
          >
            mdi-checkbox-marked-outline
          </v-icon>
          <v-icon v-else class="text-gray-300 group-hover:text-gray-400">
            mdi-checkbox-blank-outline
          </v-icon>
          <div
            :class="
              !showDeletedMember
                ? 'text-gray-400 group-hover:text-gray-500'
                : 'text-blue-500 group-hover:text-blue-600'
            "
          >
            Show Deleted Member
          </div>
        </div>

        <div v-if="myprofileStore.isCaptain()">
          <DialogsCreateMember @onSuccess="handleOnSuccess" />
        </div>
      </div>
    </div>

    <!-- แสดง v-data-table -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="pagination.per_page"
      :loading="dataLoading"
      hide-default-footer
      item-value="user_id"
      class="border-b"
    >
      <template v-slot:item="{ item }">
        <tr class="cursor-default">
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
            <div class="flex items-center gap-2 w-fit">
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
            <div
              :class="
                item.status.id === 1
                  ? 'bg-green-100 text-green-600 font-medium'
                  : item.status.id === 2
                  ? 'bg-gray-50 text-gray-400'
                  : item.status.id === 3
                  ? 'bg-red-50 text-red-400'
                  : 'bg-gray-50 text-gray-400'
              "
              class="capitalize w-fit px-3 py-1 rounded-md"
            >
              {{ item.status.name }}
            </div>
          </td>

          <td>
            <div
              v-if="item.roles[0].role_id === 1"
              class="text-gray-400 text-center"
            >
              <v-icon>mdi-lock-outline</v-icon>
            </div>
            <div v-else>
              <div
                v-if="item.user_id === myprofileStore.user_id"
                class="text-center text-gray-400"
              >
                You
              </div>

              <v-menu v-else location="bottom right">
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="p-1 rounded text-gray-400 w-fit cursor-pointer mx-auto hover:bg-gray-50"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </div>
                </template>
                <BaseMenuCard>
                  <div v-if="myprofileStore.isAdmin()">
                    <BaseMenuItem
                      label="View Profile"
                      icon="badge-account-outline"
                      @click="
                        (dialogsMemberProfile = true),
                          (dialogsMemberProfileActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                  </div>
                  <div v-else>
                    <BaseMenuItem
                      label="Change Role"
                      icon="account-star-outline"
                      @click="
                        (dialogsChangeRoleMember = true),
                          (dialogsChangeRoleMemberActionData = {
                            userId: item.user_id,
                            oldRole: item.roles[0].role_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      label="Reset Password"
                      icon="lock-reset"
                      @click="
                        (dialogsResetPasswordMember = true),
                          (dialogsResetPasswordActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      v-if="item.status.id === 1"
                      label="Suspend"
                      icon="account-cancel-outline"
                      @click="
                        (dialogsSuspendMember = true),
                          (dialogsSuspendActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      v-if="item.status.id === 2"
                      label="Active"
                      icon="account-check-outline"
                      @click="
                        (dialogsActivateMember = true),
                          (dialogsActivateActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      v-if="item.status.id !== 3"
                      label="Delete"
                      icon="trash-can-outline"
                      variant="soft-delete"
                      @click="
                        (dialogsSoftDeleteMember = true),
                          (dialogsSoftDeleteActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      v-if="item.status.id === 3"
                      label="Restore Member"
                      icon="account-convert-outline"
                      @click="
                        (dialogsRestoreDeleteMember = true),
                          (dialogsRestoreDeleteActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                    <BaseMenuItem
                      v-if="item.status.id === 3"
                      label="Permanently Delete"
                      icon="trash-can-outline"
                      variant="delete"
                      @click="
                        (dialogsPermanentlyDeleteMember = true),
                          (dialogsPermanentlyDeleteActionData = {
                            userId: item.user_id,
                          })
                      "
                    />
                  </div>
                </BaseMenuCard>
              </v-menu>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <DataTablePagination
      :pagination="pagination"
      :onPageChange="handlePageChange"
    />

    <DialogsChangeRoleMember
      v-model:isDialog="dialogsChangeRoleMember"
      :actionData="dialogsChangeRoleMemberActionData"
      @onSuccess="handleDialogsChangeRoleMemberSuccess"
    />

    <DialogsResetPasswordMember
      v-model:isDialog="dialogsResetPasswordMember"
      :actionData="dialogsResetPasswordActionData"
    />

    <DialogsSuspendMember
      v-model:isDialog="dialogsSuspendMember"
      :actionData="dialogsSuspendActionData"
      @onSuccess="handleDialogsSuspendMemberSuccess"
    />

    <DialogsActivateMember
      v-model:isDialog="dialogsActivateMember"
      :actionData="dialogsActivateActionData"
      @onSuccess="handleDialogsActivateMemberSuccess"
    />

    <DialogsDeleteMember
      v-model:isDialog="dialogsSoftDeleteMember"
      :actionData="dialogsSoftDeleteActionData"
      @onSuccess="handleDialogsSoftDeleteMemberSuccess"
    />

    <DialogsPermanentlyDeleteMember
      v-model:isDialog="dialogsPermanentlyDeleteMember"
      :actionData="dialogsPermanentlyDeleteActionData"
      @onSuccess="handleDialogsPermanentlyDeleteMemberSuccess"
    />

    <DialogsRestoreDeletedMember
      v-model:isDialog="dialogsRestoreDeleteMember"
      :actionData="dialogsRestoreDeleteActionData"
      @onSuccess="handleDialogsRestoreDeleteMemberSuccess"
    />

    <DialogsProfileMember
      v-model:isDialog="dialogsMemberProfile"
      :actionData="dialogsMemberProfileActionData"
    />
  </div>
</template>
