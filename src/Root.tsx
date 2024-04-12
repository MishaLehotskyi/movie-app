import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './ui/pages/HomePage';
import { AddMoviePage } from './ui/pages/AddMoviePage';
import { MoviePage } from './ui/pages/MoviePage';
import { MoviesPage } from './ui/pages/MoviesPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { EditMoviePage } from './ui/pages/EditMoviePage';
import { FavouritesPage } from './ui/pages/FavouritesPage';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { NotFoundPage } from './ui/pages/NotFoundPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <FavouriteProvider>
              <App />
            </FavouriteProvider>
          )}
        >
          <Route index element={<HomePage />} />
          <Route path="movies">
            <Route index element={<MoviesPage />} />
            <Route path=":id" element={<MoviePage />} />
          </Route>
          <Route path="favourite" element={<FavouritesPage />} />
          <Route path="add" element={<AddMoviePage />} />
          <Route path="edit/:id" element={<EditMoviePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
