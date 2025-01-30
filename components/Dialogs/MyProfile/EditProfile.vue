<script setup lang="ts">
import { useMyMember } from '~/components/Api/useMyMember';

const { editMyProfile } = useMyMember();
const myprofileStore = useMyprofileStore();

const isDialogActive = ref(false);
const isLoading = ref(false);
const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const dialogForm = ref();
const phone = ref('');
const firstNameTh = ref('');
const lastNameTh = ref('');
const nicknameTh = ref('');
const firstNameEn = ref('');
const lastNameEn = ref('');
const nicknameEn = ref('');

const handleCreateMember = async () => {
  const isValid = await dialogForm.value.validate();
  if (isValid.valid) {
    try {
      isLoading.value = true;
      await editMyProfile(
        phone.value,
        firstNameTh.value,
        lastNameTh.value,
        nicknameTh.value,
        firstNameEn.value,
        lastNameEn.value,
        nicknameEn.value
      );

      myprofileStore.updateProfile(
        phone.value,
        firstNameTh.value,
        lastNameTh.value,
        nicknameTh.value,
        firstNameEn.value,
        lastNameEn.value,
        nicknameEn.value
      );

      snackbar.value = {
        show: true,
        message: 'Edit Profile successfully!',
        color: 'success',
      };
      isDialogActive.value = false;
      isLoading.value = false;
    } catch (error: any) {
      snackbar.value = {
        show: true,
        message: 'Failed to edit profile. Please try again.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
};

watch(isDialogActive, async (newValue, oldValue) => {
  if (newValue) {
    phone.value = myprofileStore.user_info.phone || '';
    firstNameTh.value =
      myprofileStore.user_info_translation[0].first_name || '';
    lastNameTh.value = myprofileStore.user_info_translation[0].last_name || '';
    nicknameTh.value = myprofileStore.user_info_translation[0].nickname || '';
    firstNameEn.value =
      myprofileStore.user_info_translation[1].first_name || '';
    lastNameEn.value = myprofileStore.user_info_translation[1].last_name || '';
    nicknameEn.value = myprofileStore.user_info_translation[1].nickname || '';
  }
});
</script>

<template>
  <v-dialog v-model="isDialogActive" :persistent="isLoading" max-width="600">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="outlined" size="small">
        <div class="capitalize">edit profile</div>
      </v-btn>
    </template>

    <BaseDialogCard>
      <BaseDialogTitle> Edit Your Profile </BaseDialogTitle>
      <BaseDialogDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque sit
        cumque error atque dolore non nesciunt aperiam ex ullam.
      </BaseDialogDescription>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 text-xl font-medium">Account</div>
            <v-text-field
              v-model="phone"
              :rules="[
                (v) => !!v || 'Mobile Phone is required!',
                (v) => /^[0-9]+$/.test(v) || 'Please enter numbers only!',
              ]"
              label="Mobile Phone"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="30"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="col-span-2 text-xl font-medium">Information TH</div>
            <v-text-field
              v-model="firstNameTh"
              :rules="[(v) => !!v || 'First name is required!']"
              label="First Name (TH)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="lastNameTh"
              :rules="[(v) => !!v || 'Last name is required!']"
              label="Last Name (TH)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="nicknameTh"
              :rules="[(v) => !!v || 'Nickname is required!']"
              label="Nickname (TH)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="col-span-2 text-xl font-medium">Information EN</div>
            <v-text-field
              v-model="firstNameEn"
              :rules="[(v) => !!v || 'First name is required!']"
              label="First Name (EN)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="lastNameEn"
              :rules="[(v) => !!v || 'Last name is required!']"
              label="Last Name (EN)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="nicknameEn"
              :rules="[(v) => !!v || 'Nickname is required!']"
              label="Nickname (En)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
          </div>
        </v-form>
      </BaseDialogBody>
      <BaseDialogActions>
        <v-btn
          :disabled="isLoading"
          variant="tonal"
          @click="isDialogActive = false"
        >
          <div class="capitalize">close</div>
        </v-btn>
        <v-btn :loading="isLoading" color="primary" flat>
          <div class="capitalize" @click="handleCreateMember()">
            save change
          </div>
        </v-btn>
      </BaseDialogActions>
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
