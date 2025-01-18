<script setup lang="ts">
defineProps({
  recipientEmail: {
    type: String,
    default: '',
  },
  roleName: {
    type: String,
    default: '',
  },
});

const tab = ref<string>('account');

const tabList = [
  { name: 'Account', value: 'account' },
  { name: 'Profile', value: 'profile' },
  { name: 'Confirm', value: 'confirm' },
];

const isLoading = ref<boolean>(false);

const passwordForm = ref();
const password = ref<string>('');
const visible = ref<boolean>(false);
const passwordConfirm = ref<string>('');
const visibleConfirm = ref<boolean>(false);
const passwordConfirmError = ref<string>('');

const handleCreatePassword = async () => {
  const isValidate = await passwordForm.value.validate();
  if (isValidate.valid) {
    if (password.value !== passwordConfirm.value) {
      passwordConfirmError.value = 'Confirm password is incorrect';
    } else {
      tab.value = 'profile';
    }
  }
};

watch(passwordConfirm, (newVal, oldVal) => {
  if (newVal && passwordConfirmError.value != '') {
    passwordConfirmError.value = '';
  }
});

const profileForm = ref();
const firstName = ref<string>('');
const lastName = ref<string>('');
</script>

<template>
  <div>
    <div class="flex gap-2 p-2 bg-gray-50 rounded-md">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="[
          'px-4 py-2 rounded flex-1 text-center cursor-default',
          tab === item.value
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-500',
        ]"
      >
        {{ item.name }}
      </div>
    </div>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="account" class="p-4">
        <div class="text-left">
          <div class="mb-4">
            <h2 class="text-lg font-semibold mb-2">Setup your account</h2>
            <p><strong>Email:</strong> {{ recipientEmail || '-' }}</p>
            <p class="capitalize">
              <strong>Role:</strong> {{ roleName || '-' }}
            </p>
          </div>
          <v-form ref="passwordForm" :disabled="isLoading" class="space-y-2">
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
              required
              @click:append-inner="visible = !visible"
            />

            <v-text-field
              v-model="passwordConfirm"
              :rules="[(v) => !!v || 'Confirm Password is required!']"
              :append-inner-icon="
                visibleConfirm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              :type="visibleConfirm ? 'text' : 'password'"
              :error-messages="passwordConfirmError"
              color="primary"
              label="Confirm Password"
              density="compact"
              variant="outlined"
              required
              @click:append-inner="visibleConfirm = !visibleConfirm"
            />
          </v-form>
        </div>
        <div class="flex justify-end mt-4">
          <v-btn
            color="primary"
            class="pr-3"
            flat
            @click="handleCreatePassword()"
          >
            <div class="capitalize mr-2">next</div>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-tabs-window-item>

      <!-- Profile Tab -->
      <v-tabs-window-item value="profile" class="p-4">
        <div class="text-left">
          <h2 class="text-lg font-semibold mb-2">Setup your profile</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            voluptates consectetur minus doloribus fugit? Repellendus nostrum
            veritatis excepturi necessitatibus sequi iste maxime, itaque,
            asperiores optio in tenetur! Officiis, ratione? Perspiciatis.
          </p>
        </div>
        <div class="flex justify-between mt-4">
          <v-btn variant="tonal" class="pl-3" flat @click="tab = 'account'">
            <v-icon>mdi-chevron-left</v-icon>
            <div class="capitalize ml-2">back</div>
          </v-btn>
          <v-btn color="primary" class="pr-3" flat @click="tab = 'confirm'">
            <div class="capitalize mr-2">next</div>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-tabs-window-item>

      <!-- Confirm Tab -->
      <v-tabs-window-item value="confirm" class="p-4">
        <div class="text-left">
          <h2 class="text-lg font-semibold mb-2">Confirm your setup</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            voluptates consectetur minus doloribus fugit? Repellendus nostrum
            veritatis excepturi necessitatibus sequi iste maxime, itaque,
            asperiores optio in tenetur! Officiis, ratione? Perspiciatis.
          </p>
        </div>
        <div class="flex justify-between mt-4">
          <v-btn variant="tonal" class="pl-3" flat @click="tab = 'profile'">
            <v-icon>mdi-chevron-left</v-icon>
            <div class="capitalize ml-2">back</div>
          </v-btn>

          <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
