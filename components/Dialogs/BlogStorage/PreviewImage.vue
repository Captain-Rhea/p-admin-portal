<script setup lang="ts">
interface PropsData {
  storageData: any;
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
</script>

<template>
  <v-dialog
    v-model="isDialog"
    max-width="80%"
    @click:outside="emit('update:isDialog', false)"
  >
    <BaseDialogCard>
      <div class="w-full relative">
        <div
          class="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
          @click="emit('update:isDialog', false)"
        >
          <v-icon>mdi-close</v-icon>
        </div>
      </div>
      <BaseDialogTitle>
        {{ props.actionData.storageData.image_name }}
      </BaseDialogTitle>
      <BaseDialogBody full-height>
        <div class="rounded-lg overflow-hidden">
          <v-img
            :src="props.actionData.storageData.base_url"
            :lazy-src="props.actionData.storageData.lazy_url"
            class="bg-black"
          />
        </div>
      </BaseDialogBody>
    </BaseDialogCard>
  </v-dialog>
</template>
