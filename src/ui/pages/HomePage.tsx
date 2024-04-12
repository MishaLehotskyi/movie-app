import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div className="flex flex-col justify-center items-center h-full">
    <h1 className="text-4xl font-bold mb-8">Welcome to Movie App</h1>
    <p className="text-lg text-gray-700 mb-8">Discover and explore a world of movies</p>
    <Link to="/movies" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Go to Movies
    </Link>
  </div>
);
