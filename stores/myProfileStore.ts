import { defineStore } from 'pinia';

// Interfaces สำหรับ Profile
interface MyProfile {
  user_id: number;
  user_info: {
    avatar_base_url: string | null;
    avatar_id: number | null;
    avatar_lazy_url: string | null;
    phone: string;
  };
  user_info_translation: UserInfoTranslation[];
  email: string;
  permissions: Permissions[];
  roles: Roles[];
  status: {
    id: number;
    name: string;
  };
  updated_at: string;
}

interface Permissions {
  description: string;
  name: string;
  permission_id: number;
}

interface Roles {
  description: string;
  name: string;
  role_id: number;
}

interface UserInfoTranslation {
  first_name: string;
  language_code: string;
  last_name: string;
  nickname: string;
  updated_at: string;
}

// Pinia Store
export const useMyprofileStore = defineStore('myProfileStore', {
  state: (): MyProfile => ({
    user_id: 0,
    user_info: {
      avatar_base_url: null,
      avatar_id: null,
      avatar_lazy_url: null,
      phone: '',
    },
    user_info_translation: [],
    email: '',
    permissions: [],
    roles: [],
    status: {
      id: 0,
      name: '',
    },
    updated_at: '',
  }),

  actions: {
    async fetchProfile(profileData: MyProfile) {
      this.$patch(profileData);
    },

    updateAvatar(avatarBaseUrl: string, avatarLazyUrl: string) {
      this.user_info.avatar_base_url = avatarBaseUrl;
      this.user_info.avatar_lazy_url = avatarLazyUrl;
    },

    updateProfile(
      phone: string,
      firstNameTh: string,
      lastNameTh: string,
      nicknameTh: string,
      firstNameEn: string,
      lastNameEn: string,
      nicknameEn: string
    ) {
      this.user_info.phone = phone;
      this.user_info_translation[0].first_name = firstNameTh;
      this.user_info_translation[0].last_name = lastNameTh;
      this.user_info_translation[0].nickname = nicknameTh;
      this.user_info_translation[1].first_name = firstNameEn;
      this.user_info_translation[1].last_name = lastNameEn;
      this.user_info_translation[1].nickname = nicknameEn;
    },

    resetProfile() {
      this.$reset();
    },

    isCaptain() {
      return this.roles.some((role) => role.role_id === 1);
    },

    isOwner() {
      return this.roles.some((role) => role.role_id === 2);
    },

    isAdmin() {
      return this.roles.some((role) => role.role_id === 3);
    },
  },
});
