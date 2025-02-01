export const useBlogStorage = () => {
  const { $mainApi }: any = useNuxtApp();

  const getImages = async (
    page: string,
    perPage: string,
    imageName?: string,
    startDate?: string,
    endDate?: string
  ) => {
    try {
      const response = await $mainApi.get('/v1/storage/blog/image', {
        params: {
          page: page,
          per_page: perPage,
          image_name: imageName || '',
          start_date: startDate || '',
          end_date: endDate || '',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

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

  const deleteImage = async (storageId: number) => {
    try {
      const response = await $mainApi.delete('/v1/storage/blog/image', {
        params: {
          storage_id: storageId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getImages,
    uploadImage,
    deleteImage,
  };
};
