import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import axios from '../../axios';
import { PostType, PostsSliceType } from '../../@types/appTypes';
import { RootState } from '../store';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const { data } = await axios.get('/api/posts');
    return data as PostType[];
  } catch (error) {
    console.log(error);
  }
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  try {
    const { data } = await axios.get('/api/tags');
    const uniqTags = [...new Set(data)];
    return uniqTags as string[];
  } catch (error) {
    console.log(error);
  }
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (params: string) => {
    try {
      const post: { data: PostType } = await axios.delete(
        `/api/posts/${params}`
      );
      return post.data._id as string;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: PostsSliceType = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts.items = payload || [];
      state.posts.status = 'fulfilled';
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    });
    builder.addCase(fetchTags.fulfilled, (state, { payload }) => {
      state.tags.items = payload || [];
      state.tags.status = 'fulfilled';
    });
    builder.addCase(fetchRemovePost.rejected, (state) => {
      state.posts.status = 'error';
    });
    builder.addCase(fetchRemovePost.fulfilled, (state, { payload }) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== payload
      );
      state.posts.status = 'fulfilled';
    });
  },
});

// export const { } = postsSlice.actions;

export default postsSlice.reducer;
