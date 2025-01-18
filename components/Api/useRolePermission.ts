export const useRolePermission = () => {
  const { $mainApi }: any = useNuxtApp();

  const getRoles = async () => {
    try {
      const response = await $mainApi.get('/v1/roles');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getPermission = async () => {
    try {
      const response = await $mainApi.get('/v1/permissions');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getRoles,
    getPermission,
  };
};
