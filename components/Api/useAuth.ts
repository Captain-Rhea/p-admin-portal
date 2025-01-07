export const useAuth = () => {
  const { $idpApi }: any = useNuxtApp();

  const login = async (email: string, password: string) => {
    try {
      const response = await $idpApi.post('/v1/auth/login', {
        email,
        password,
      });
      const token = useCookie('_app_scope');
      token.value = response.data.data.token;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const isLogin = async (getToken: any) => {
    try {
      const response = await $idpApi.post(
        '/v1/auth/is-login',
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      const token = useCookie('_app_scope');
      token.value = response.data.data.token;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { login, isLogin };
};
