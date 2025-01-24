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
  user_info_translation: UserInfoTranslation;
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
    user_info_translation: {
      first_name: '',
      language_code: '',
      last_name: '',
      nickname: '',
      updated_at: '',
    },
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

    updateEmail(newEmail: string) {
      this.email = newEmail;
    },

    updateAvatar(
      avatarBaseUrl: string,
      avatarId: number,
      avatarLazyUrl: string
    ) {
      this.user_info.avatar_base_url = avatarBaseUrl;
      this.user_info.avatar_id = avatarId;
      this.user_info.avatar_lazy_url = avatarLazyUrl;
    },

    addPermission(permission: Permissions) {
      this.permissions.push(permission);
    },

    addRole(role: Roles) {
      this.roles.push(role);
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
