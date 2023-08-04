export interface PostType {
  author?: {
    avatarUrl?: string;
    createdAt?: string;
    email?: string;
    lastname?: string;
    name?: string;
    password?: string;
    updatedAt?: string;
    _id?: string;
  };
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
  data: PostType['author'] | null;
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

export type FormCreatePostValues = {
  title: string;
  tags: string;
  imageUrl: FileList;
};

export interface TagsBlockType {
  items: string[];
  isLoading: boolean;
}

export interface UserType {
  user?: {
    fullName: string;
    avatarUrl: string;
  };
  text?: string;
}

export interface CommentsBlockTypes {
  items?: UserType[];
  children?: React.ReactNode;
  isLoading?: boolean;
}

export interface dataType {
  title: string;
  text: string;
  tags?: string[];
  imageUrl?: string;
}
