import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { client } from '../../utils/axiosClient';
import { useParams } from 'react-router-dom';

export const EditMoviePage = () => {
  const { id } = useParams();
  const initialMovie: Movie = {
    id: 0,
    title: '',
    description: '',
    rating: 0,
    release_date: '',
    genre: [],
    actors: [],
    director: '',
    image: '',
  };
  const [movie, setMovie] = useState<Movie>(initialMovie);
  const {
    title,
    description,
    rating,
    release_date,
    genre,
    actors,
    director,
    image,
  } = movie;
  const [currentGenre, setCurrentGenre] = useState('');
  const [currentActor, setCurrentActor] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const canSubmit = title.trim() && description.trim() && !!rating
        && release_date.trim() && director.trim() && image.trim() && genre.length > 0 && actors.length > 0;

  useEffect(() => {
    client.get<Movie>(`/movies/${id}`)
      .then(res => {
        setMovie(res);
      });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();

    setMovie({...movie, [event.target.name]: event.target.value});
  };


  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentGenre(e.target.value);
  };

  const handleActorChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentActor(e.target.value);
  };


  const handleGenreAdd = () => {
    setMovie(prevState => ({ ...prevState, genre: [...prevState.genre, currentGenre.trim()] }));
    setCurrentGenre('');
  };

  const handleGenreDelete = (index: number) => {
    setMovie(prevState => {
      const arr = [...prevState.genre];

      arr.splice(index, 1);

      return ({ ...prevState, genre: arr });
    });
  };

  const handleActorAdd = () => {
    setMovie(prevState => ({ ...prevState, actors: [...prevState.actors, currentActor.trim()] }));
    setCurrentActor('');
  };

  const handleActorDelete = (index: number) => {
    setMovie(prevState => {
      const arr = [...prevState.actors];

      arr.splice(index, 1);

      return ({ ...prevState, actors: arr });
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSubmit) {
      const data: Omit<Movie, 'id'> = {
        title,
        description,
        rating,
        release_date,
        director,
        image,
        actors,
        genre,
      };

      client.patch(`/movies/${id}`, data);
      setShowRules(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } else {
      setShowRules(true);
    }
  };

  const handleClearForm = () => {
    setMovie(initialMovie);
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title" type="text" name="title" placeholder="Title"
          value={title} onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description" name="description" placeholder="Description"
          value={description} onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rating" name="rating" type="number" min="0" max="10" step="0.1" placeholder="Rating"
          value={rating} onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="release_date">
          Release Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="release_date" name="release_date" type="date" placeholder="Release Date"
          value={release_date} onChange={handleChange}
        />
      </div>
      <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="genre">
        Genre
      </label>
      <div className="mb-4 flex items-center gap-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="genre" type="text" placeholder="Genre"
          value={currentGenre} onChange={handleGenreChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGenreAdd}
          disabled={!currentGenre.trim()}
        >
          Add
        </button>
      </div>
      {genre.map((item, index) => (
        <span key={item} className="inline-flex items-center bg-blue-500 text-white font-semibold px-3 py-1 rounded-full text-sm mr-2 mb-2">
          <span>{item}</span>
          <button
            className="ml-1 bg-red-500 text-white font-semibold px-2 py-0.5 rounded-full text-sm"
            onClick={() => {
              handleGenreDelete(index);
            }}
          >
            X
          </button>
        </span>
      ))}
      <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="actors">
        Actors
      </label>
      <div className="mb-4 flex items-center gap-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="actors" type="text" placeholder="Actors"
          value={currentActor} onChange={handleActorChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleActorAdd}
          disabled={!currentActor.trim()}
        >
          Add
        </button>
      </div>
      {actors.map((item, index) => (
        <span key={item} className="inline-flex items-center bg-green-500 text-white font-semibold px-3 py-1 rounded-full text-sm mr-2 mb-2">
          <span>{item}</span>
          <button
            className="ml-1 bg-red-500 text-white font-semibold px-2 py-0.5 rounded-full text-sm"
            onClick={() => {
              handleActorDelete(index);
            }}
          >
            X
          </button>
        </span>
      ))}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="director">
          Director
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="director" name="director" type="text" placeholder="Director"
          value={director} onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image" name="image" type="text" placeholder="Image URL"
          value={image} onChange={handleChange}
        />
      </div>
      {showSuccess && (
        <div className="mb-4">
          <p className="text-green-600 text-sm italic">Movie created successfully!</p>
        </div>
      )}
      {showRules && (
        <div className="mb-4">
          <p className="text-red-600 text-sm italic">Each field must be filled and at least one actor and genre must be added.</p>
        </div>
      )}
      <div className="mb-6">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="button"
          onClick={handleClearForm}
        >
          Clear Form
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
            Save Changes
        </button>
      </div>
    </form>
  );
};
