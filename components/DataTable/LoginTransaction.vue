<script setup lang="ts">
import moment from 'moment';
import { useMembers } from '~/components/Api/useMembers';

const { getMemberInvite } = useMembers();
const formatDate = (dateTime: string) => {
  return moment(dateTime).format('DD-MM-YYYY');
};
const formatTime = (dateTime: string) => {
  return moment(dateTime).format('HH:mm:ss A');
};
const isExpired = (dateTime: string) => {
  return moment().isAfter(moment(dateTime));
};

const dataLoading = ref<boolean>(false);

const headers = ref<any>([
  { title: 'Email', sortable: false, key: 'recipient_email' },
  { title: 'Invite Link', sortable: false, key: 'invite_link' },
  { title: 'Role', sortable: false, key: 'role' },
  { title: 'Status', sortable: false, key: 'status' },
  { title: 'Invite At', sortable: false, key: 'created_at' },
  { title: 'Expires At', sortable: false, key: 'expires_at' },
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
  await handleGetMembersInvite();
};

const handleGetMembersInvite = async () => {
  try {
    dataLoading.value = true;
    const statusId = '4,5';
    const response = await getMemberInvite(
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
  await handleGetMembersInvite();
});

const handleOnSuccess = async (event: boolean) => {
  if (event) await handleGetMembersInvite();
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    snackbarCopyText.value = 'Copied to clipboard!';
    snackbarCopy.value = true;
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const snackbarCopy = ref<boolean>(false);
const snackbarCopyText = ref<string>('Copied to clipboard');

// Resend Invite Member
const dialogsResendInviteMember = ref<boolean>(false);
const dialogsResendInviteMemberActionData = ref();
const handleDialogsResendInviteMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembersInvite();
};

// Reject Invite Member
const dialogsRejectInviteMember = ref<boolean>(false);
const dialogsRejectInviteMemberActionData = ref();
const handleDialogsRejectInviteMemberSuccess = async (event: boolean) => {
  if (event) await handleGetMembersInvite();
};

const searchInput = ref('');
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const onSearchInput = async () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  if (searchInput.value === '') {
    await handleGetMembersInvite();
  } else {
    debounceTimer = setTimeout(async () => {
      await handleGetMembersInvite();
    }, 1500);
  }
};
</script>

<template>
  <div>
    <div class="px-2">
      <h1 class="text-3xl capitalize">Sign In Transaction</h1>
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
        <v-btn size="small" variant="text" @click="handleGetMembersInvite()">
          <v-icon class="text-gray-500">mdi-refresh</v-icon>
          <div class="capitalize ml-1">refresh</div>
        </v-btn>
        <DialogsInviteMember @onSuccess="handleOnSuccess" />
      </div>
    </div>

    <!-- แสดง v-data-table -->
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
          <td>{{ item.recipient_email }}</td>

          <td>
            <div
              v-tooltip:top="'Copy Link'"
              class="flex items-center gap-2 cursor-pointer w-fit group hover:text-blue-500"
              @click="copyToClipboard(item.invite_link)"
            >
              <div>{{ item.ref_code }}</div>
              <v-icon size="16" class="text-gray-400 group-hover:text-blue-500">
                mdi-content-copy
              </v-icon>
            </div>
          </td>

          <td>
            <div class="capitalize">
              {{ item.role?.name }}
            </div>
          </td>

          <td>
            <div
              :class="
                item.status.id === 4
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : item.status.id === 5
                  ? 'bg-orange-50 text-orange-500 font-medium'
                  : 'bg-gray-50 text-gray-400'
              "
              class="capitalize w-fit px-3 py-1 rounded-md"
            >
              {{
                item.status.id === 4
                  ? 'Sent'
                  : item.status.id === 5
                  ? 'Pending'
                  : 'Other'
              }}
            </div>
          </td>

          <td>
            <div class="flex items-center gap-1">
              <span>{{ formatDate(item.created_at) }}</span>
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
              :class="!isExpired(item.expires_at) || 'text-red-500'"
              class="flex items-center gap-1"
            >
              <span>{{ formatDate(item.expires_at) }}</span>
              <v-icon
                v-if="!isExpired(item.expires_at)"
                v-tooltip:top="formatTime(item.expires_at)"
                class="text-gray-400"
                size="18"
              >
                mdi-clock-outline
              </v-icon>
              <v-icon
                v-else
                v-tooltip:top="'Link is expired'"
                class="text-red-400"
                size="18"
              >
                mdi-timer-alert-outline
              </v-icon>
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
                  label="Resent"
                  icon="email-sync-outline"
                  @click="
                    (dialogsResendInviteMember = true),
                      (dialogsResendInviteMemberActionData = {
                        recipientEmail: item.recipient_email,
                        roleId: item.role.id,
                      })
                  "
                />
                <BaseMenuItem
                  label="Reject"
                  icon="email-remove-outline"
                  variant="soft-delete"
                  @click="
                    (dialogsRejectInviteMember = true),
                      (dialogsRejectInviteMemberActionData = {
                        inviteId: item.id,
                      })
                  "
                />
              </BaseMenuCard>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>

    <DataTablePagination
      :pagination="pagination"
      :onPageChange="handlePageChange"
    />

    <DialogsResendInviteMember
      v-model:isDialog="dialogsResendInviteMember"
      :actionData="dialogsResendInviteMemberActionData"
      @onSuccess="handleDialogsResendInviteMemberSuccess"
    />

    <DialogsRejectInviteMember
      v-model:isDialog="dialogsRejectInviteMember"
      :actionData="dialogsRejectInviteMemberActionData"
      @onSuccess="handleDialogsRejectInviteMemberSuccess"
    />

    <v-snackbar
      v-model="snackbarCopy"
      color="white"
      location="top"
      class="mt-4"
      width="100"
    >
      <div class="flex items-center justify-center gap-4">
        <span>{{ snackbarCopyText }}</span>
        <v-icon class="text-green-500">mdi-check-circle-outline</v-icon>
      </div>
    </v-snackbar>
  </div>
</template>
