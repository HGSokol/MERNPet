import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PostType, PostsSliceType } from '../../@types/appTypes';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const { data } = await axios.get('/api/posts')
    return data as PostType[]
  } catch (error) {
    console.log(error)
  }

})

const initialState: PostsSliceType = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    }),
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    }),
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts.items = payload || [];
      state.posts.status = 'fulfilled';
    })
  },
  }
)

// export {} = postsSlice.actions

export default postsSlice.reducer