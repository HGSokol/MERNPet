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
    items: PostType[] | [],
    status: 'loading'| 'error' | 'fulfilled'
  },
  tags: {
    items: [],
    status: 'loading'| 'error' | 'fulfilled'
  }
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