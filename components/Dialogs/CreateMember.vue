<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';
import { useRolePermission } from '~/components/Api/useRolePermission';

const emit = defineEmits(['onSuccess']);
const { createMember } = useMembers();
const { getRoles } = useRolePermission();

const isDialogActive = ref(false);
const isLoading = ref(false);
const snackbar = ref(false);

const dialogForm = ref();
const email = ref('');
const password = ref('');
const visible = ref(false);
const roleId = ref();
const rolesList = ref([]);
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
      await createMember(
        email.value,
        password.value,
        roleId.value,
        phone.value,
        firstNameTh.value,
        lastNameTh.value,
        nicknameTh.value,
        firstNameEn.value,
        lastNameEn.value,
        nicknameEn.value
      );
      emit('onSuccess', true);
      isDialogActive.value = false;
      isLoading.value = false;
    } catch (error: any) {
      console.log(error.response);
      snackbar.value = true;
    }
  }
};

watch(isDialogActive, async (newValue, oldValue) => {
  if (newValue) {
    try {
      const response = await getRoles();
      rolesList.value = response.data;
    } catch (error: any) {
      console.error(error.response);
    }
  } else {
    dialogForm.value.reset();
  }
});
</script>

<template>
  <v-dialog v-model="isDialogActive" :persistent="isLoading" max-width="600">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" class="pl-3" flat>
        <v-icon>mdi-plus</v-icon>
        <div class="capitalize ml-2">create</div>
      </v-btn>
    </template>

    <BaseDialogCard>
      <BaseDialogTitle> Create Member </BaseDialogTitle>
      <BaseDialogDescription>
        This action for captain only
      </BaseDialogDescription>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 text-xl font-medium">Account</div>
            <v-text-field
              v-model="email"
              :rules="[
                (v) => !!v || 'Password is required!',
                (v) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                  'Invalid email format!',
              ]"
              label="Enter Email"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="password"
              :rules="[
                (v) => !!v || 'Password is required!',
                (v) =>
                  (v && v.length >= 6) ||
                  'Password must be at least 6 characters!',
              ]"
              :append-inner-icon="
                visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              :type="visible ? 'text' : 'password'"
              color="primary"
              label="Enter Password"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
              @click:append-inner="visible = !visible"
            />
            <v-text-field
              v-model="phone"
              :rules="[(v) => !!v || 'Phone is required!']"
              label="Enter Phone"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="30"
              required
            />
            <v-select
              v-model="roleId"
              :items="rolesList"
              :rules="[(v) => !!v || 'Role is required!']"
              label="Role"
              density="compact"
              variant="outlined"
              item-title="name"
              item-value="id"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="col-span-2 text-xl font-medium">Information TH</div>
            <v-text-field
              v-model="firstNameTh"
              :rules="[(v) => !!v || 'First name is required!']"
              label="Enter First Name (TH)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="lastNameTh"
              :rules="[(v) => !!v || 'Last name is required!']"
              label="Enter Last Name (TH)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="nicknameTh"
              :rules="[(v) => !!v || 'Nickname is required!']"
              label="Enter Nickname (TH)"
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
              label="Enter First Name (EN)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="lastNameEn"
              :rules="[(v) => !!v || 'Last name is required!']"
              label="Enter Last Name (EN)"
              color="primary"
              density="compact"
              variant="outlined"
              maxlength="250"
              required
            />
            <v-text-field
              v-model="nicknameEn"
              :rules="[(v) => !!v || 'Nickname is required!']"
              label="Enter Nickname (En)"
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
          <div class="capitalize" @click="handleCreateMember()">Create</div>
        </v-btn>
      </BaseDialogActions>
    </BaseDialogCard>
  </v-dialog>

  <v-snackbar
    v-model="snackbar"
    color="#ffffff"
    location="bottom right"
    class="mb-4 mr-4"
    vertical
  >
    <div class="pb-2 text-red-500 text-lg font-semibold">
      Create Member Failed
    </div>
    <p>Create the member is Failed. Please try again.</p>
    <template v-slot:actions>
      <v-btn variant="tonal" color="error" @click="snackbar = false">
        <div class="capitalize">Close</div>
      </v-btn>
    </template>
  </v-snackbar>
</template>
