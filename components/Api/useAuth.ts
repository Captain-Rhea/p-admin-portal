export const useAuth = () => {
  const { $mainApi }: any = useNuxtApp();

  const login = async (email: string, password: string) => {
    try {
      const response = await $mainApi.post('/v1/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const isLogin = async () => {
    try {
      const response = await $mainApi.get('/v1/auth/is-login');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await $mainApi.post('/v1/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { login, isLogin, logout };
};
