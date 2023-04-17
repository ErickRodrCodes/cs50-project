import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteConstants } from './constants';
import { IndexPage } from './Pages/Index';
import { LoginPage } from './Pages/Login';
import { RegistrationPage } from './Pages/Registration';
import { MovieDetailsPage } from './Pages/MovieDetails';
import { MovieReviewPage } from './Pages/MovieReview';

export const App = () => {
  const router = createBrowserRouter([
    { path: RouteConstants.ROOT, element: <IndexPage /> },
    { path: RouteConstants.LOGIN, element: <LoginPage /> },
    { path: RouteConstants.REGISTER, element: <RegistrationPage /> },
    { path: RouteConstants.MOVIE_DETAILS, element: <MovieDetailsPage /> },
    { path: RouteConstants.MOVIE_REVIEWS, element: <MovieReviewPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
