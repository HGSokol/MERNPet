export interface AuthorType {
  avatarUrl: string;
  createdAt: string;
  email: string;
  lastname: string;
  name: string;
  password: string;
  updatedAt: string;
  _id: string;
}

export interface CommentType {
  author: AuthorType,
  createdAt: string;
  post: string;
  text: string;
  updatedAt: string;
  _id: string;
}

export interface PostType {
  author: AuthorType,
  comments?: CommentType[]
  createdAt?: string;
  tags?: string[];
  text?: string;
  title?: string;
  updatedAt?: string;
  imageUrl?: string;
  viewsCount?: number;
  _id?: string;
}

export interface PostsSliceType {
  posts: {
    items: PostType[] | [];
    status: 'loading' | 'error' | 'fulfilled';
  };
  tags: {
    items: string[];
    status: 'loading' | 'error' | 'fulfilled';
  };
}

export interface AuthSliceType {
  data: AuthorType | null;
  status: 'loading' | 'error' | 'fulfilled';
}

export type FormRegistrationValues = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type FormLoginValues = {
  email: string;
  password: string;
};

export interface TagsBlockType {
  items: string[];
  isLoading: boolean;
}

export interface dataType {
  title: string;
  text: string;
  tags: string[];
  imageUrl: string;
}

export interface CommentBlockType {
  items: CommentType[] | null;
  children: React.ReactNode;
  isLoading: Boolean;
}


