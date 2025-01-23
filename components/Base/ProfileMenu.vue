<script setup>
const { locale, locales } = useI18n();
const myprofileStore = useMyprofileStore();

const dialogsSignOut = ref(false);
</script>

<template>
  <div>
    <v-menu location="bottom right">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          <v-avatar>
            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
          </v-avatar>
        </div>
      </template>
      <BaseMenuCard>
        <div class="flex gap-2 border-b pb-2 w-full">
          <v-avatar>
            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
          </v-avatar>
          <div
            v-for="(item, index) in myprofileStore.user_info_translation"
            :key="index"
          >
            <div v-if="locale === item.language_code">
              <div class="font-medium truncate max-w-[150px]">
                {{ item.first_name }}
                {{ item.last_name }}
              </div>
              <div class="capitalize text-gray-500 text-sm">
                {{ myprofileStore.roles[0].name }}
              </div>
            </div>
          </div>
        </div>
        <BaseMenuItem
          label="My Profile"
          icon="account-outline"
          @click="navigateTo('/my-profile')"
        />
        <BaseMenuItem
          label="Sign Out"
          icon="logout"
          variant="soft-delete"
          @click="dialogsSignOut = true"
        />
      </BaseMenuCard>
    </v-menu>

    <DialogsSignOut v-model:isDialog="dialogsSignOut" />
  </div>
</template>
