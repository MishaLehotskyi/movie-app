import { FavouriteContext } from '../../contexts/FavouriteContext';
import React, { useContext } from 'react';
import { MovieCard } from '../components/MovieCard';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouriteContext);

  if (!favourites.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-600 mb-8">Seems like your favourites list is empty...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center py-4">
      {favourites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};
