<!-- <DialogsChangeRoleMember/> -->
<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';
import { useRolePermission } from '~/components/Api/useRolePermission';

interface PropsData {
  userId: number;
  oldRole: number;
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

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog', 'onSuccess']);

const { changeRoleMember } = useMembers();
const { getRoles } = useRolePermission();

const isLoading = ref(false);
const dialogForm = ref();
const roleId = ref();
const rolesList = ref([]);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

const handleChangeRoleMember = async () => {
  const isValid = await dialogForm.value?.validate();
  if (isValid?.valid && props.actionData) {
    try {
      isLoading.value = true;
      await changeRoleMember(props.actionData.userId, roleId.value);
      emit('onSuccess', true);
      emit('update:isDialog', false);
      snackbar.value = {
        show: true,
        message: 'Update role successfully!',
        color: 'success',
      };
    } catch (error) {
      snackbar.value = {
        show: true,
        message: 'Failed to update role. Please try again later.',
        color: 'error',
      };
    } finally {
      isLoading.value = false;
    }
  }
};

watch(isDialog, async (newValue) => {
  if (newValue) {
    try {
      const response = await getRoles();
      rolesList.value = response.data.filter((role: any) => role.id !== 1);
      roleId.value = props.actionData.oldRole;
    } catch (error) {
      rolesList.value = [];
    }
  } else {
    dialogForm.value?.reset();
  }
});
</script>

<template>
  <v-dialog
    v-model="isDialog"
    :persistent="isLoading"
    max-width="400"
    @click:outside="!isLoading && emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <BaseDialogTitle>Change Member Role</BaseDialogTitle>
      <BaseDialogDescription>
        Please select a new role for the member.
      </BaseDialogDescription>
      <BaseDialogBody>
        <v-form ref="dialogForm" :disabled="isLoading" class="space-y-4">
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
          @click="emit('update:isDialog', false)"
        >
          <div class="capitalize">Close</div>
        </v-btn>
        <v-btn
          :loading="isLoading"
          color="primary"
          flat
          @click="handleChangeRoleMember"
        >
          <div class="capitalize">Confirm</div>
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
