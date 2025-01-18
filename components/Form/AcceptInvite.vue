<script setup lang="ts">
import { useMembers } from '~/components/Api/useMembers';

const props = defineProps({
  recipientEmail: {
    type: String,
    default: '',
  },
  roleName: {
    type: String,
    default: '',
  },
  refCode: {
    type: String,
    default: '',
  },
});

const { memberInviteAccept } = useMembers();

const tab = ref<string>('account');

const tabList = [
  { name: 'Account', value: 'account' },
  { name: 'Profile', value: 'profile' },
  { name: 'Confirm', value: 'confirm' },
];

const snackbar = ref<boolean>(false);
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
const mobilePhone = ref<string>('');
const firstNameTh = ref<string>('');
const lastNameTh = ref<string>('');
const nicknameTh = ref<string>('');
const firstNameEn = ref<string>('');
const lastNameEn = ref<string>('');
const nicknameEn = ref<string>('');

const handleCheckProfile = async () => {
  const isValidate = await profileForm.value.validate();
  if (isValidate.valid) {
    tab.value = 'confirm';
  }
};

const thaiPhoneFormat = (phone: string): string => {
  if (phone.length === 10 && /^[0-9]+$/.test(phone)) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
};

const handleCreateAccount = async () => {
  try {
    isLoading.value = true;
    await memberInviteAccept(
      props.refCode,
      props.recipientEmail,
      password.value,
      props.roleName,
      mobilePhone.value,
      firstNameTh.value,
      lastNameTh.value,
      nicknameTh.value,
      firstNameEn.value,
      lastNameEn.value,
      nicknameEn.value
    );
    navigateTo('/auth/sign-in');
  } catch (error: any) {
    snackbar.value = true;
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <div class="flex gap-2 p-2">
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

    <v-tabs-window v-model="tab" class="border rounded-lg">
      <!-- Account Tab -->
      <v-tabs-window-item value="account" class="p-4">
        <div class="text-left">
          <div class="mb-4">
            <h2 class="text-lg font-semibold mb-2">Setup your account</h2>
            <p><strong>Email:</strong> {{ recipientEmail || '-' }}</p>
            <p class="capitalize">
              <strong>Role:</strong> {{ roleName || '-' }}
            </p>
          </div>
          <v-form ref="passwordForm" class="space-y-4">
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
              maxlength="250"
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
        <v-form ref="profileForm" class="space-y-2">
          <h2 class="text-lg font-semibold mb-2">Setup your profile</h2>
          <div class="space-y-2">
            <div class="pt-4">
              <v-text-field
                v-model="mobilePhone"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="Mobile Phone"
                density="compact"
                variant="outlined"
                maxlength="30"
                required
              />
            </div>

            <v-divider class="border-gray-800" />

            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 text-lg">Enter thai profile</div>
              <v-text-field
                v-model="firstNameTh"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="First Name (TH)"
                density="compact"
                variant="outlined"
                maxlength="250"
                required
              />
              <v-text-field
                v-model="lastNameTh"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="Last Name (TH)"
                density="compact"
                variant="outlined"
                maxlength="250"
                required
              />
              <v-text-field
                v-model="nicknameTh"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="Nickname (TH)"
                density="compact"
                variant="outlined"
                class="col-span-2"
                maxlength="250"
                required
              />
            </div>

            <v-divider class="border-gray-800" />

            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 text-lg">Enter english profile</div>
              <v-text-field
                v-model="firstNameEn"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="First Name (EN)"
                density="compact"
                variant="outlined"
                maxlength="250"
                required
              />
              <v-text-field
                v-model="lastNameEn"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="Last Name (EN)"
                density="compact"
                variant="outlined"
                maxlength="250"
                required
              />
              <v-text-field
                v-model="nicknameEn"
                :rules="[(v) => !!v || 'Required!']"
                color="primary"
                label="Nickname (EN)"
                density="compact"
                variant="outlined"
                class="col-span-2"
                maxlength="250"
                required
              />
            </div>
          </div>
        </v-form>
        <div class="flex justify-between mt-4">
          <v-btn variant="tonal" class="pl-3" flat @click="tab = 'account'">
            <v-icon>mdi-chevron-left</v-icon>
            <div class="capitalize ml-2">back</div>
          </v-btn>
          <v-btn
            color="primary"
            class="pr-3"
            flat
            @click="handleCheckProfile()"
          >
            <div class="capitalize mr-2">next</div>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-tabs-window-item>

      <!-- Confirm Tab -->
      <v-tabs-window-item value="confirm" class="p-4">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold mb-2">Confirm your setup</h2>
          <div class="mt-4">
            <div class="flex">
              <strong class="min-w-[120px]">Email :</strong>
              <div class="flex-1 truncate">
                {{ recipientEmail }}
              </div>
            </div>
            <div class="flex">
              <strong class="min-w-[120px]">Role :</strong>
              <div class="flex-1 truncate capitalize">
                {{ roleName }}
              </div>
            </div>

            <div class="flex mt-4">
              <strong class="min-w-[120px]">Mobile Phone :</strong>
              <div class="flex-1 truncate capitalize">
                {{ thaiPhoneFormat(mobilePhone) }}
              </div>
            </div>

            <div class="flex mt-4">
              <strong class="min-w-[120px]">Full Name (TH) :</strong>
              <div class="flex-1 truncate capitalize">
                {{ firstNameTh }}
                {{ lastNameTh }}
              </div>
            </div>
            <div class="flex">
              <strong class="min-w-[120px]">Nickname (TH) :</strong>
              <div class="flex-1 truncate capitalize">
                {{ nicknameTh }}
              </div>
            </div>

            <div class="flex mt-4">
              <strong class="min-w-[120px]">Full Name (EN) :</strong>
              <div class="flex-1 truncate capitalize">
                {{ firstNameEn }}
                {{ lastNameEn }}
              </div>
            </div>
            <div class="flex">
              <strong class="min-w-[120px]">Nickname (EN) :</strong>
              <div class="flex-1 truncate capitalize">
                {{ nicknameEn }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <v-btn
            :disabled="isLoading"
            variant="tonal"
            class="pl-3"
            flat
            @click="tab = 'profile'"
          >
            <v-icon>mdi-chevron-left</v-icon>
            <div class="capitalize ml-2">back</div>
          </v-btn>

          <v-btn
            :loading="isLoading"
            color="success"
            flat
            @click="handleCreateAccount()"
          >
            <div class="capitalize">confirm</div>
          </v-btn>
        </div>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      color="#ffffff"
      location="bottom"
      max-width="450"
      vertical
    >
      <div class="pb-2 text-red-500 text-lg font-semibold">
        Registration Failed!
      </div>
      <p>
        Something went wrong while processing your registration. Please try
        again or contact support if the issue persists.
      </p>
      <template v-slot:actions>
        <v-btn variant="tonal" color="error" @click="snackbar = false">
          <div class="capitalize">Close</div>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
