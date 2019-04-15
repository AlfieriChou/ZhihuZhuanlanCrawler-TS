export interface Badge {
  topics: any[];
  type: string;
  description: string;
}

export interface Author {
  is_followed: boolean;
  avatar_url_template: string;
  uid: string;
  user_type: string;
  is_following: boolean;
  type: string;
  url_token: string;
  id: string;
  description: string;
  name: string;
  is_advertiser: boolean;
  headline: string;
  gender: number;
  url: string;
  avatar_url: string;
  is_org: boolean;
  badge: Badge[];
}

export interface PinnedArticleAndAuthor {
  updated: number;
  is_labeled: boolean;
  excerpt: string;
  admin_closed_comment: boolean;
  id: number;
  voteup_count: number;
  title_image: string;
  title: string;
  url: string;
  comment_permission: string;
  author: Author;
  state: string;
  created: number;
  comment_count: number;
  image_url: string;
  excerpt_title: string;
  voting: number;
  type: string;
}
