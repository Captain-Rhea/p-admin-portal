export interface BlogApiResponse {
  status: string;
  message: string;
  data: {
    paginations: BlogPagination;
    data: BlogList[];
  };
}

export interface BlogPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface UserProfile {
  user_id: number;
  email: string;
  avatar_base_url: string;
  avatar_lazy_url: string;
  user_info: UserInfo[];
}

export interface UserInfo {
  language_code: string;
  first_name: string;
  last_name: string;
  nickname: string;
}

export interface BlogList {
  id: string;
  slug: string;
  cover_image: string | null;
  title_th: string | null;
  title_en: string | null;
  summary_th: string | null;
  summary_en: string | null;
  status: string;
  published_by: UserProfile | null;
  published_at: string | null;
  locked_by: UserProfile | null;
  locked_at: string | null;
  created_by: UserProfile;
  created_at: string;
  updated_by: UserProfile;
  updated_at: string;
}

export interface TabList {
  name: string;
  value: string;
}
