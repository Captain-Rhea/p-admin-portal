<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

const { sendMemberInvite } = useMembers();

const email = ref('');
const isDialogActive = ref(false);

const handleInvite = async () => {
  if (email.value.trim()) {
    await sendMemberInvite(email.value, 3);
    email.value = '';
    isDialogActive.value = false;
  } else {
    console.log('Please enter a valid email address.');
  }
};
</script>

<template>
  <v-dialog v-model="isDialogActive" max-width="500">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" class="pl-3" variant="tonal">
        <v-icon icon="mdi-account-plus-outline" class="mr-2" />
        <span class="capitalize">Invite</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Invite User</v-card-title>
      <v-card-text>
        <p>Enter the email address to send an invitation:</p>
        <v-text-field
          v-model="email"
          label="Email Address"
          placeholder="example@domain.com"
          type="email"
          variant="outlined"
          density="comfortable"
          clearable
          hide-details="auto"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="isDialogActive = false">Cancel</v-btn>
        <v-btn color="primary" @click="handleInvite">Send Invite</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
