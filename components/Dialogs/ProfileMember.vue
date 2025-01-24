<!-- <DialogsChangeRoleMember/> -->
<script setup lang="ts">
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

const { getMemberProfile } = useMembers();

const { isDialog } = toRefs(props);
const emit = defineEmits(['update:isDialog', 'onSuccess']);

const isLoading = ref(false);

const snackbar = ref({
  show: false,
  message: '',
  color: 'error',
});

watch(isDialog, async (newValue) => {
  if (newValue) {
    const response = await getMemberProfile(props.actionData.userId.toString());
    console.log(response);
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
      <BaseDialogTitle>Profile</BaseDialogTitle>
      <BaseDialogDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ab!
      </BaseDialogDescription>
      <BaseDialogBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
        facere quos aspernatur ad atque, eius corrupti numquam, aut architecto
        doloribus, error officia soluta exercitationem. Consequatur at amet
        eveniet reprehenderit explicabo?
      </BaseDialogBody>
      <BaseDialogActions>
        <v-btn
          :disabled="isLoading"
          variant="tonal"
          @click="emit('update:isDialog', false)"
        >
          <div class="capitalize">Close</div>
        </v-btn>
        <v-btn :loading="isLoading" color="primary" flat>
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
