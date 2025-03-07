<script setup lang="ts">
useHead({
  titleTemplate: 'My Profile - %s',
});

const { locale } = useI18n();

const myprofileStore: any = useMyprofileStore();

const thaiPhoneFormat = (phone: string) => {
  if (phone.length === 10 && /^[0-9]+$/.test(phone)) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
};
</script>

<template>
  <div class="px-4">
    <div class="mb-4">
      <h1 class="text-3xl">My Profile</h1>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-4 h-full">
        <div class="px-4 py-6 rounded-md bg-white border h-full">
          <div class="relative w-fit mx-auto cursor-default">
            <v-avatar size="180" color="primary">
              <v-img
                v-if="myprofileStore.user_info.avatar_base_url"
                :src="myprofileStore.user_info.avatar_base_url"
                :lazy-src="myprofileStore.user_info.avatar_lazy_url"
              />
              <div
                v-else
                class="font-medium text-white text-7xl mt-3 uppercase"
              >
                {{ myprofileStore.user_info_translation[1]?.first_name[0] }}
                {{ myprofileStore.user_info_translation[1]?.last_name[0] }}
              </div>
            </v-avatar>
            <DialogsMyProfileUpdateAvatar />
          </div>

          <div
            v-for="(item, index) in myprofileStore.user_info_translation"
            :key="index"
          >
            <div v-if="locale === item.language_code" class="text-center mt-2">
              <div class="text-3xl font-semibold">
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div class="text-gray-500 text-xl">
                {{ item.nickname }}
              </div>
            </div>
          </div>

          <div class="capitalize text-center text-3xl mt-4">
            {{ myprofileStore?.roles[0]?.name }}
          </div>

          <div class="text-center text-gray-500">
            {{ myprofileStore?.email }}
          </div>

          <div class="text-center text-gray-500 mt-4">
            {{ thaiPhoneFormat(myprofileStore?.user_info.phone) }}
          </div>

          <div class="text-center mt-4">
            <DialogsMyProfileEditProfile />
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-8 h-full">
        <div class="p-4 rounded-md border">
          <DataTableLoginTransaction />
        </div>
      </div>
    </div>
  </div>
</template>
