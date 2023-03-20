import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexPage } from './Pages/Index';
import { LoginPage } from './Pages/Login';
import { RegistrationPage } from './Pages/Registration';

export const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <IndexPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/registration', element: <RegistrationPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
