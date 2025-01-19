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

  const forceLogout = async () => {
    try {
      const response = await $mainApi.post('/v1/auth/force-logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (recipientEmail: string) => {
    try {
      const response = await $mainApi.post('/v1/auth/send/forgot-mail', {
        recipient_email: recipientEmail,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const forgotPasswordVerifyKey = async (resetKey: string) => {
    try {
      const response = await $mainApi.post('/v1/auth/send/forgot-mail/verify', {
        reset_key: resetKey,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const forgotPasswordReset = async (
    recipientEmail: string | null,
    resetKey: string,
    newPassword: string
  ) => {
    try {
      const response = await $mainApi.post(
        '/v1/auth/send/forgot-mail/reset-password',
        {
          recipient_email: recipientEmail,
          reset_key: resetKey,
          new_password: newPassword,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (userId: number, newPassword: string) => {
    try {
      const response = await $mainApi.post('/v1/auth/reset-password', {
        user_id: userId,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    isLogin,
    logout,
    forceLogout,
    forgotPassword,
    forgotPasswordVerifyKey,
    forgotPasswordReset,
    resetPassword,
  };
};
