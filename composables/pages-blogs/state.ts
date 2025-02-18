import type { BlogList, BlogPagination, TabList } from './interface';

export const useBlogState = () => {
  const isLoadingBlogDataList = ref<boolean>(false);
  const blogDataListPagination = ref<BlogPagination>({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 0,
  });
  const blogDataList = ref<BlogList[]>([]);

  const tab = ref<string>('articles');
  const tabList = ref<TabList[]>([
    { name: 'Articles', value: 'articles' },
    { name: 'Author', value: 'author' },
  ]);

  const setIsLoadingBlogDataList = (newValue: boolean) => {
    isLoadingBlogDataList.value = newValue;
  };

  const setBlogDataListPagination = (newValue: BlogPagination) => {
    blogDataListPagination.value = newValue;
  };

  const setBlogDataList = (newValue: BlogList[]) => {
    blogDataList.value = newValue;
  };

  const setTab = (newValue: string) => {
    tab.value = newValue;
  };

  return {
    isLoadingBlogDataList,
    setIsLoadingBlogDataList,
    blogDataListPagination,
    setBlogDataListPagination,
    blogDataList,
    setBlogDataList,
    tab,
    setTab,
    tabList,
  };
};
