import React, { useContext } from 'react';
import { Movie } from '../../types/Movie';
import { useAppDispatch } from '../../app/hooks';
import { deleteMovie } from '../../slices/movieSlice';
import { Link } from 'react-router-dom';
import { FavouriteContext } from '../../contexts/FavouriteContext';

interface Props {
  movie: Movie,
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { favourites, handleAddToFav } = useContext(FavouriteContext);
  const { id, image, title, rating, release_date } = movie;
  const isFavourite = favourites.some(f => f.id === movie.id);

  const handleMovieDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(deleteMovie(id));

    if (isFavourite) {
      handleAddToFav(movie);
    }
  };

  const handleAddToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleAddToFav(movie);
  };

  return (
    <Link
      to={`/movies/${id}`}
      className="bg-gray-100 rounded-lg overflow-hidden shadow-md w-72 transition duration-300 transform hover:scale-105 hover:bg-gray-200"
    >
      <img src={image} alt={`Movie poster: ${id}`} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 h-12">{title}</h3>
        <div className="flex items-center mb-2">
          <svg className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1a1 1 0 01.77.36l2.86 3.6 5.37.78a1 1 0 01.55 1.7l-3.28 3.2.77 5.35a1 1 0 01-1.45 1.05L10 16.34l-4.04 2.13a1 1 0 01-1.45-1.05l.77-5.35-3.28-3.2a1 1 0 01.55-1.7l5.37-.78L9.23 1.36A1 1 0 0110 1zm0 2.33L8.89 5.16a1 1 0 01-.76.35l-3.42.50 2.47 2.41a1 1 0 01.29.89l-.58 3.22 2.86-1.51a1 1 0 01.95 0l2.86 1.51-.58-3.22a1 1 0 01.29-.89l2.47-2.41-3.42-.50a1 1 0 01-.76-.35L10 3.34z" clipRule="evenodd"/>
          </svg>
          <span className="text-gray-700">{rating}</span>
        </div>
        <p className="text-gray-700 mb-2 h-5">Release Date: {release_date}</p>
        {isFavourite
          ? (<button
            className="flex mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
            onClick={handleAddToFavorites}
          >
            Added to Favourites
          </button>)
          : (<button
            className="flex mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
            onClick={handleAddToFavorites}
          >
            Add to Favourites
          </button>)}
      </div>
      <button
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
        onClick={handleMovieDelete}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </Link>
  );
};
