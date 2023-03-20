import { withAppContextContainer } from '../../components/AppContext';
import Login from '../../components/Login';

export function LoginPageComponent() {
  return <Login />;
}

export const LoginPage = withAppContextContainer(LoginPageComponent);
