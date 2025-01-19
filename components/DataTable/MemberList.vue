<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMembers } from '~/components/Api/useMembers';

const { getMembers } = useMembers();

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

const handleGetMembers = async () => {
  try {
    const response = await getMembers();
    desserts.value = response.data.data.filter(
      (user: any) => user.roles[0].role_id !== 1
    );
  } catch (error: any) {
    console.error(error.response);
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
</script>

<template>
  <div>
    <div class="flex items-center justify-between mt-4 mb-2 px-2">
      <div class="flex-1">
        <h1 class="text-3xl">Members</h1>
      </div>
      <div class="flex-1 flex items-center justify-end">
        <DialogsCreateMember @onSuccess="handleOnSuccess" />
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
            <div
              :class="
                item.status.id === 1
                  ? 'bg-green-50 text-green-500'
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
            <v-menu location="bottom right">
              <template v-slot:activator="{ props }">
                <div
                  v-bind="props"
                  class="p-1 rounded text-gray-400 w-fit cursor-pointer mx-auto hover:bg-gray-50"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </div>
              </template>
              <BaseMenuCard>
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
              </BaseMenuCard>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>

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
  </div>
</template>
