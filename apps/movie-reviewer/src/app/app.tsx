import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteConstants } from './constants';
import { IndexPage } from './Pages/Index';
import { LoginPage } from './Pages/Login';
import { RegistrationPage } from './Pages/Registration';

export const App = () => {
  const router = createBrowserRouter([
    { path: RouteConstants.ROOT, element: <IndexPage /> },
    { path: RouteConstants.LOGIN, element: <LoginPage /> },
    { path: RouteConstants.REGISTER, element: <RegistrationPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
