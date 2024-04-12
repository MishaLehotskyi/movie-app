import React from 'react';
import { Movie } from '../../types/Movie';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './Loader';
import { MovieCard } from './MovieCard';

interface Props {
  movies: Movie[],
  hasMore: boolean,
  next: () => void,
  loaded: boolean,
}

export const MovieList: React.FC<Props> = ({ movies, hasMore, next, loaded }) => {
  if (!loaded) {
    return (<Loader className="flex h-full justify-center items-center" />);
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center py-4"
      hasMore={hasMore}
      next={next}
      loader={<Loader className="col-span-full" />}
    >
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </InfiniteScroll>
  );
};
