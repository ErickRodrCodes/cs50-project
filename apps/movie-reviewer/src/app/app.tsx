import MovieList from './components/MovieList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppContainer from './components/AppContainer';

export const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <MovieList />}
  ])

  return (
    <AppContainer>
      <div>Navigation goes here</div>
      <div className="flex flex-col items-center gap-20 py-20">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AppContainer>
  );
};

export default App;
