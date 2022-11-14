/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
import IBlog from '../../interfaces/blog';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  // const blogs = response.data.blogs as IBlog[];
  const { data } = await axios.get('/blogs');
  return data;
});

export const fetchTags = createAsyncThunk('blogs/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemoveBlog = createAsyncThunk(
  'blogs/fetchRemoveBlog',
  async (id: any) => axios.delete(`/blogs/${id}`)
);

export interface BlogsState {
  blogs: {
    items: {
      blogs: IBlog[],
      count: number
    },
    status: 'loading' | 'loaded' | 'error',
  };
  tags: {
    items: Array<string>[],
    status: 'loading' | 'loaded' | 'error',
  };
}

const initialState: BlogsState = {
  blogs: {
    items: {
      blogs: [], 
      count: 0
    },
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.blogs.items.blogs = [];
        state.blogs.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs.items.blogs = action.payload.blogs;
        state.blogs.status = 'loaded';
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.blogs.items.blogs = [];
        state.blogs.status = 'error';
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      });
    //   .addCase(fetchRemovePost.pending, (state, action) => {
    //     state.posts.items = state.posts.items.filter(
    //       (obj: any) => obj._id !== action.meta.arg
    //     );
    //   });
  },
});

export const blogsReducer = blogsSlice.reducer;
