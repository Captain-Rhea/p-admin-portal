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
            class="absolute right-[-8px]"
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
        <div v-else class="grid grid-cols-12">
          <div class="col-span-4 py-4">
            <div class="rounded-md overflow-hidden w-fit h-fit mt-2">
              <v-avatar
                rounded="0"
                size="120"
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
          <div class="col-span-8">
            <div class="flex mt-6">
              <div class="min-w-[90px] font-medium">Username:</div>
              <div class="w-full truncate">
                {{ memberData.email }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium">Role:</div>
              <div class="w-full truncate capitalize">
                {{ memberData.roles[0].name }}
              </div>
            </div>

            <div class="flex mt-4">
              <div class="min-w-[90px] font-medium">Full Name:</div>
              <div class="w-full truncate capitalize">
                {{ memberData.user_info_translation[0].first_name }}
                {{ memberData.user_info_translation[0].last_name }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium">Nickname:</div>
              <div class="w-full truncate capitalize">
                {{ memberData.user_info_translation[0].nickname }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium">Mobile:</div>
              <div class="w-full truncate capitalize">
                {{ thaiPhoneFormat(memberData.user_info.phone) }}
              </div>
            </div>

            <div class="flex">
              <div class="min-w-[90px] font-medium">Register At:</div>
              <div class="w-full truncate capitalize">
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
