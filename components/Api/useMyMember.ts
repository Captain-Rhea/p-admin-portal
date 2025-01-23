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

  return {
    myProfile,
  };
};
