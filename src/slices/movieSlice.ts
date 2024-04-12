import { Movie } from '../types/Movie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoviesResponse } from '../types/MoviesResponse';
import { client } from '../utils/axiosClient';

type MovieState = {
  movies: Movie [],
  loaded: boolean,
  hasError: boolean,
  hasMore: boolean,
  currentPage: number
};

const initialState: MovieState = {
  movies: [],
  loaded: false,
  hasError: false,
  hasMore: true,
  currentPage: 1,
};

export const fetchFirstMovies = createAsyncThunk(
  'movies/fetch-first',
  () => {
    return client.get<MoviesResponse>('/movies/?_page=1&_per_page=12');
  },
);

export const fetchNextMovies = createAsyncThunk(
  'movies/fetch-next',
  (page: number) => {
    return client.get<MoviesResponse>(`/movies/?_page=${page}&_per_page=12`);
  },
);

export const deleteMovie = createAsyncThunk(
  'movies/delete',
  (id: number | string) => {
    return client.delete(`/movies/${id}`);
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFirstMovies.pending, state => {
      state.loaded = false;
    });
    builder.addCase(fetchFirstMovies.fulfilled, (state, action) => {
      state.movies = action.payload.data;

      if (!action.payload.next) {
        state.hasMore = false;
      }

      state.loaded = true;
      state.currentPage += 1;
    });
    builder.addCase(fetchFirstMovies.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(fetchNextMovies.fulfilled, (state, action) => {
      state.movies = [...state.movies, ...action.payload.data];

      if (!action.payload.next) {
        state.hasMore = false;
      }

      state.currentPage += 1;
    });
    builder.addCase(fetchNextMovies.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload.data.id);
    });
  },
});

export const { reset } = movieSlice.actions;

export const movieReducer = movieSlice.reducer;
