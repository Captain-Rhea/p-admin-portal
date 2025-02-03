export const usePageStorage = () => {
  const { $mainApi }: any = useNuxtApp();

  const getImages = async (
    page: string,
    perPage: string,
    imageName?: string,
    startDate?: string,
    endDate?: string
  ) => {
    try {
      const response = await $mainApi.get('/v1/storage/image-storage', {
        params: {
          page: page,
          per_page: perPage,
          group: 'page-storage',
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

  const uploadImage = async (
    formData: any,
    onProgress?: (progress: number) => void
  ) => {
    try {
      const response = await $mainApi.post(
        '/v1/storage/image-storage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: {
            loaded: number;
            total: number;
          }) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (onProgress) {
              onProgress(percentCompleted);
            }
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (storageId: number) => {
    try {
      const response = await $mainApi.delete('/v1/storage/image-storage', {
        params: {
          storage_id: storageId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const downloadImage = async (storageId: number) => {
    try {
      const response = await $mainApi.get(
        '/v1/storage/image-storage/download',
        {
          params: { storage_id: storageId },
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const editImageName = async (storageId: number, newImageName: string) => {
    try {
      const response = await $mainApi.post('/v1/storage/image-storage/name', {
        storage_id: storageId,
        new_image_name: newImageName,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const multipleDeleteImages = async (storageIds: string) => {
    try {
      const response = await $mainApi.delete('/v1/storage/images-storage', {
        params: {
          storage_ids: storageIds,
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
    downloadImage,
    editImageName,
    multipleDeleteImages,
  };
};
