export const useMembers = () => {
  const { $mainApi }: any = useNuxtApp();

  const getMembers = async () => {
    try {
      const response = await $mainApi.get('/v1/member');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getMemberInvite = async () => {
    try {
      const response = await $mainApi.get('/v1/member/invite');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const sendMemberInvite = async (recipientEmail: string, roleId: number) => {
    try {
      const response = await $mainApi.post('/v1/member/invite', {
        recipient_email: recipientEmail,
        role_id: roleId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const memberInviteVerify = async (refCode: string) => {
    try {
      const response = await $mainApi.post('/v1/member/invite/verify', {
        ref_code: refCode,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const memberInviteAccept = async (
    refCode: string,
    recipientEmail: string,
    password: string,
    roleName: string,
    phone: string,
    firstNameTh: string,
    lastNameTh: string,
    nicknameTh: string,
    firstNameEn: string,
    lastNameEn: string,
    nicknameEn: string
  ) => {
    try {
      const response = await $mainApi.post('/v1/member/invite/accept', {
        ref_code: refCode,
        recipient_email: recipientEmail,
        password: password,
        role_name: roleName,
        phone: phone,
        first_name_th: firstNameTh,
        last_name_th: lastNameTh,
        nickname_th: nicknameTh,
        first_name_en: firstNameEn,
        last_name_en: lastNameEn,
        nickname_en: nicknameEn,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createMember = async (
    email: string,
    password: string,
    roleId: number,
    phone: string,
    firstNameTh: string,
    lastNameTh: string,
    nicknameTh: string,
    firstNameEn: string,
    lastNameEn: string,
    nicknameEn: string
  ) => {
    try {
      const response = await $mainApi.post('/v1/member', {
        email: email,
        password: password,
        role_id: roleId,
        phone: phone,
        first_name_th: firstNameTh,
        last_name_th: lastNameTh,
        nickname_th: nicknameTh,
        first_name_en: firstNameEn,
        last_name_en: lastNameEn,
        nickname_en: nicknameEn,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const suspendMember = async (userId: number) => {
    try {
      const response = await $mainApi.put(
        `/v1/member/suspend/${userId.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const activeMember = async (userId: number) => {
    try {
      const response = await $mainApi.put(
        `/v1/member/active/${userId.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteMember = async (userId: number) => {
    try {
      const response = await $mainApi.delete(`/v1/member/${userId.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const softDeleteMember = async (userId: number) => {
    try {
      const response = await $mainApi.delete(
        `/v1/member/${userId.toString()}/soft`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const restoreMember = async (userId: number) => {
    try {
      const response = await $mainApi.put(
        `/v1/member/${userId.toString()}/restore`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const changeRoleMember = async (userId: number, newRole: number) => {
    try {
      const response = await $mainApi.put(
        `/v1/member/change-role/${userId.toString()}`,
        {
          new_role_id: newRole,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getMembers,
    getMemberInvite,
    sendMemberInvite,
    memberInviteVerify,
    memberInviteAccept,
    createMember,
    suspendMember,
    activeMember,
    deleteMember,
    softDeleteMember,
    restoreMember,
    changeRoleMember,
  };
};
