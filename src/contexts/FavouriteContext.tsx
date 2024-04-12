import React from 'react';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Movie } from '../types/Movie';

interface State {
    favourites: Movie[],
    setFavourites: (favMovies: Movie[]) => void,
    handleAddToFav: (movie: Movie) => void,
}

export const FavouriteContext = React.createContext<State>({
  favourites: [],
  setFavourites: () => {},
  handleAddToFav: () => {},
});

interface Props {
    children: React.ReactNode,
}

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<Movie[]>('favorites', []);

  const handleAddToFav = (movie: Movie) => {
    if (favourites.some(fav => fav.id === movie.id)) {
      setFavourites((currentFavs: Movie[]) => (
        currentFavs.filter(fav => fav.id !== movie.id)
      ));
    } else {
      setFavourites((currentFavs: Movie[]) => [...currentFavs, movie]);
    }
  };

  const value = {
    favourites,
    setFavourites,
    handleAddToFav,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
