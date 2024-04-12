import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { client } from '../../utils/axiosClient';
import { useParams } from 'react-router-dom';

export const EditMoviePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const canSubmit = title.trim() && description.trim() && rating.trim()
        && date.trim() && director.trim() && imgUrl.trim() && genres.length > 0 && actors.length > 0;

  useEffect(() => {
    client.get<Movie>(`/movies/${id}`)
      .then(res => {
        setTitle(res.title);
        setDescription(res.description);
        setRating(res.rating.toString());
        setDate(res.release_date);
        setGenres(res.genre);
        setDirector(res.director);
        setImgUrl(res.image);
        setActors(res.actors);
      });
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRating(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  const handleActorChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setActor(e.target.value);
  };

  const handleDirectorChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDirector(e.target.value);
  };

  const handleImgUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImgUrl(e.target.value);
  };

  const handleGenreAdd = () => {
    setGenres(prevState => [...prevState, genre.trim()]);
    setGenre('');
  };

  const handleGenreDelete = (index: number) => {
    setGenres(prevState => {
      const arr = [...prevState];

      arr.splice(index, 1);

      return arr;
    });
  };

  const handleActorDelete = (index: number) => {
    setActors(prevState => {
      const arr = [...prevState];

      arr.splice(index, 1);

      return arr;
    });
  };

  const handleActorAdd = () => {
    setActors(prevState => [...prevState, actor.trim()]);
    setActor('');
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSubmit) {
      const data: Omit<Movie, 'id'> = {
        title,
        description,
        rating: Number(rating),
        release_date: date.split('.').join('-'),
        director,
        image: imgUrl,
        actors,
        genre: genres,
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
    setTitle('');
    setRating('');
    setDate('');
    setGenre('');
    setActor('');
    setGenres([]);
    setActors([]);
    setDirector('');
    setDescription('');
    setImgUrl('');
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
          id="title" type="text" placeholder="Title"
          value={title} onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description" placeholder="Description"
          value={description} onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rating" type="number" min="0" max="10" step="0.1" placeholder="Rating"
          value={rating} onChange={handleRatingChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="release_date">
          Release Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="release_date" type="date" placeholder="Release Date"
          value={date} onChange={handleDateChange}
        />
      </div>
      <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="genre">
        Genre
      </label>
      <div className="mb-4 flex items-center gap-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="genre" type="text" placeholder="Genre"
          value={genre} onChange={handleGenreChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGenreAdd}
          disabled={!genre.trim()}
        >
          Add
        </button>
      </div>
      {genres.map((genre, index) => (
        <span key={genre} className="inline-flex items-center bg-blue-500 text-white font-semibold px-3 py-1 rounded-full text-sm mr-2 mb-2">
          <span>{genre}</span>
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
          value={actor} onChange={handleActorChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleActorAdd}
          disabled={!actor.trim()}
        >
          Add
        </button>
      </div>
      {actors.map((actor, index) => (
        <span key={actor} className="inline-flex items-center bg-green-500 text-white font-semibold px-3 py-1 rounded-full text-sm mr-2 mb-2">
          <span>{actor}</span>
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
          id="director" type="text" placeholder="Director"
          value={director} onChange={handleDirectorChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image" type="text" placeholder="Image URL"
          value={imgUrl} onChange={handleImgUrlChange}
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
