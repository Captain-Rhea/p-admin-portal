export const useMyMember = () => {
  const { $mainApi }: any = useNuxtApp();

  const myProfile = async () => {
    try {
      const response = await $mainApi.get('/v1/my-member/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editMyProfile = async (
    phone: string,
    firstNameTh: string,
    lastNameTh: string,
    nicknameTh: string,
    firstNameEn: string,
    lastNameEn: string,
    nicknameEn: string
  ) => {
    try {
      const response = await $mainApi.put('/v1/my-member/detail', {
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

  const uploadAvatar = async (formData: any) => {
    try {
      const response = await $mainApi.post('/v1/my-member/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    myProfile,
    editMyProfile,
    uploadAvatar,
  };
};
