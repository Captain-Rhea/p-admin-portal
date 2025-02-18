import type { BlogApiResponse } from './interface';
import { useBlogState } from './state';

export const useBlogApi = () => {
  const { $mainApi }: any = useNuxtApp();
  const {
    setIsLoadingBlogDataList,
    setBlogDataListPagination,
    setBlogDataList,
  } = useBlogState();

  const getArticles = async (
    page: string,
    perPage: string,
    startDate?: string,
    endDate?: string
  ) => {
    try {
      setIsLoadingBlogDataList(true);
      const response = await $mainApi.get('/v1/blog/articles', {
        params: {
          page: page,
          per_page: perPage,
          start_date: startDate || '',
          end_date: endDate || '',
        },
      });
      setBlogDataListPagination(response.data.paginations);
      console.log(response.data.data.data);

      setBlogDataList(response.data.data.data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingBlogDataList(false);
    }
  };

  return { getArticles };
};
