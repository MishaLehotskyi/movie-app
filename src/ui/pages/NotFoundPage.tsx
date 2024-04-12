import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-500 hover:text-blue-700">Go back to Home</Link>
  </div>
);
