import {Link, NavLink} from 'react-router-dom';
import classNames from 'classnames';
const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'text-gray-300 hover:text-white', { 'text-white': isActive },
);
export const Header = () => (
  <header className="bg-gray-800 p-4">
    <div className="mx-auto flex justify-between items-center">
      <Link to="/" className="text-white font-semibold text-lg">Movie App</Link>
      <nav className="flex space-x-4">
        <NavLink to="/movies" className={getLinkClass}>Movies</NavLink>
        <NavLink to="/favourite" className={getLinkClass}>Favourite</NavLink>
        <NavLink to="/add" className={getLinkClass}>Add Movie</NavLink>
      </nav>
    </div>
  </header>
);
