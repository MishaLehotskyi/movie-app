import { MovieList } from '../components/MovieList';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFirstMovies, fetchNextMovies, reset } from '../../slices/movieSlice';
import { useSearchParams } from 'react-router-dom';

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { movies,hasMore, currentPage, loaded, hasError  } = useAppSelector(state => state.movies);

  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase().trim()));

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);

    if (!e.target.value) {
      newParams.delete('query');
    } else {
      newParams.set('query', e.target.value);
    }

    setSearchParams(newParams);
  };

  const next = useCallback(() => {
    dispatch(fetchNextMovies(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchFirstMovies());

    return () => {
      dispatch(reset());
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-600 mb-8">Failed to fetch data, try again later...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-lg mx-auto mb-4 mt-4">
        <input
          className="w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search films..."
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <MovieList movies={filteredMovies} hasMore={hasMore} next={next} loaded={loaded}/>
    </>
  );
};
