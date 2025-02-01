<!-- <DialogsChangeRoleMember/> -->
<script setup lang="ts">
import moment from 'moment';
import { useMembers } from '~/components/Api/useMembers';

interface PropsData {
  userId: number;
}

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  actionData: {
    type: Object as PropType<PropsData>,
    default: null,
  },
});

const formatDate = (dateTime: string) => {
  return moment(dateTime).format('DD-MM-YYYY');
};

const thaiPhoneFormat = (phone: string): string => {
  if (phone.length === 10 && /^[0-9]+$/.test(phone)) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
};

const { getMemberProfile } = useMembers();

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog', 'onSuccess']);

const isLoading = ref(false);
const memberData = ref();

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

watch(isDialog, async (newValue) => {
  if (newValue) {
    try {
      isLoading.value = true;
      const response = await getMemberProfile(
        props.actionData.userId.toString()
      );
      memberData.value = response;
    } catch (error) {
      emit('update:isDialog', false);
      snackbar.value = {
        show: true,
        message:
          'Unable to retrieve member profile. Please check your connection and try again.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
});
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="500"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogBody>
        <div class="w-full relative">
          <div
            class="absolute right-[-8px] cursor-pointer text-gray-400 hover:text-gray-600"
            @click="emit('update:isDialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="flex inset-0 items-center justify-center h-[100px]"
        >
          loading...
        </div>
        <div v-else class="grid grid-cols-12 gap-4">
          <div class="col-span-4 py-4">
            <div class="rounded-lg overflow-hidden w-fit h-fit mt-2">
              <v-avatar
                rounded="0"
                size="140"
                color="primary"
                class="cursor-pointer"
              >
                <v-img
                  v-if="memberData.user_info.avatar_id"
                  :src="memberData.user_info.avatar_base_url"
                  :lazy-src="memberData.user_info.avatar_lazy_url"
                />
                <div
                  v-else
                  class="font-medium text-white text-8xl mt-3 uppercase"
                >
                  {{ memberData.user_info_translation[0].first_name[0] || 'U' }}
                </div>
              </v-avatar>
            </div>
          </div>
          <div class="col-span-8 space-y-2">
            <div class="mt-6">
              <h3 class="text-2xl font-medium">Member Details</h3>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Username:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ memberData.email }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Role:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ memberData.roles[0].name }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Full Name:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ memberData.user_info_translation[0].first_name }}
                {{ memberData.user_info_translation[0].last_name }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Nickname:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ memberData.user_info_translation[0].nickname }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Mobile:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ thaiPhoneFormat(memberData.user_info.phone) }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium py-1">Register At:</div>
              <div
                class="w-full truncate px-2 py-1 bg-gray-50 rounded-md text-gray-600"
              >
                {{ formatDate(memberData.created_at) }}
              </div>
            </div>
          </div>
        </div>
      </BaseDialogBody>
    </BaseDialogCard>
  </v-dialog>

  <v-snackbar
    v-model="snackbar.show"
    color="white"
    location="bottom right"
    class="mb-4 mr-4"
    vertical
  >
    <div
      class="pb-2 text-lg font-semibold"
      :class="snackbar.color === 'error' ? 'text-red-500' : 'text-green-500'"
    >
      {{ snackbar.color === 'error' ? 'Error' : 'Success' }}
    </div>
    <p>{{ snackbar.message }}</p>
    <template v-slot:actions>
      <v-btn variant="tonal" @click="snackbar.show = false">
        <div class="capitalize">Close</div>
      </v-btn>
    </template>
  </v-snackbar>
</template>
