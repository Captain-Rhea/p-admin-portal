export const useBlogStorage = () => {
  const { $mainApi }: any = useNuxtApp();

  const uploadImage = async (formData: any) => {
    try {
      const response = await $mainApi.post('/v1/storage/blog/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (imageId: number) => {
    try {
      console.log('Test');

      // const response = await $mainApi.get('/v1/roles');
      // return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    uploadImage,
    deleteImage,
  };
};
