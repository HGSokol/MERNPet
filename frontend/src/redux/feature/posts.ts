import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostsSliceType {
  posts: {
    items: [],
    status: 'loading'| 'error' | 'ok'
  },
  tags: {
    items: [],
    status: 'loading'| 'error' | 'ok'
  }
}

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
  reducers:{}
})

// export {} = postsSlice.actions

export default postsSlice.reducer