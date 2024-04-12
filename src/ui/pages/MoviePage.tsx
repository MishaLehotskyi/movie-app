import {Link, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { client } from '../../utils/axiosClient';
import { Movie } from '../../types/Movie';
import { Loader } from '../components/Loader';

export const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    client.get<Movie>(`/movies/${id}`)
      .then(res => {
        setMovie(res);
      })
      .catch(e => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <Loader className="flex h-full justify-center items-center" />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-600 mb-8">Failed to fetch data, try again later...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">{movie?.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 mb-4">{movie?.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Actors</h2>
          <ul className="text-gray-700 mb-4">
            {movie?.actors.map(actor => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Director</h2>
          <p className="text-gray-700 mb-4">{movie?.director}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Genre</h2>
          <ul className="text-gray-700 mb-4">
            {movie?.genre.map(g => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <p className="text-gray-700 mb-4">{movie?.rating}</p>
        </div>
        <Link
          to={`/edit/${movie?.id}`}
          className="w-fit h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
