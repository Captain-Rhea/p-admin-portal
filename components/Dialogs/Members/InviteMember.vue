<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';
import { useRolePermission } from '~/components/Api/useRolePermission';

const emit = defineEmits(['onSuccess']);
const { sendMemberInvite } = useMembers();
const { getRoles } = useRolePermission();

const dialogForm = ref();
const email = ref('');
const roleId = ref();
const rolesList = ref([]);

const isDialogActive = ref(false);
const isLoading = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('Invite the member is Failed. Please try again.');

const handleInvite = async () => {
  const isValid = await dialogForm.value.validate();
  if (isValid.valid) {
    try {
      isLoading.value = true;
      await sendMemberInvite(email.value.trim(), roleId.value);

      emit('onSuccess', true);
      isDialogActive.value = false;
      isLoading.value = false;
    } catch (error: any) {
      snackbarMessage.value = error.response.data.message;
      snackbar.value = true;
      isLoading.value = false;
    }
  }
};

watch(isDialogActive, async (newValue, oldValue) => {
  if (newValue) {
    try {
      const response = await getRoles();
      rolesList.value = response.data.filter((role: any) => role.id !== 1);
    } catch (error: any) {
      console.error(error.response);
    }
  } else {
    dialogForm.value.reset();
  }
});
</script>

<template>
  <v-dialog v-model="isDialogActive" :persistent="isLoading" max-width="400">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" class="pl-3" flat>
        <v-icon>mdi-account-plus-outline</v-icon>
        <div class="capitalize ml-2">Invite</div>
      </v-btn>
    </template>
    <BaseDialogCard>
      <BaseDialogTitle> Invite Member </BaseDialogTitle>
      <BaseDialogDescription>
        Enter the email address to send an invitation
      </BaseDialogDescription>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-4">
          <v-text-field
            v-model="email"
            :rules="[
              (v) => !!v || 'Email is required!',
              (v) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format!',
            ]"
            label="Recipient Email"
            type="email"
            variant="outlined"
            color="primary"
            density="compact"
            maxlength="250"
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
        <v-btn
          :loading="isLoading"
          color="primary"
          class="pr-3"
          flat
          @click="handleInvite()"
        >
          <div class="capitalize mr-2">Send</div>
          <v-icon>mdi-send-outline</v-icon>
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
      Invite Member Failed
    </div>
    <p>{{ snackbarMessage }}</p>
    <template v-slot:actions>
      <v-btn variant="tonal" color="error" @click="snackbar = false">
        <div class="capitalize">Close</div>
      </v-btn>
    </template>
  </v-snackbar>
</template>
