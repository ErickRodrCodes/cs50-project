import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AppContainer from '../AppContainer';
import Navigation from '../Navigation';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

interface AuthContextProps {
  isLoggedIn: boolean;
  userId: number | null;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  userId: null,
});

export const useAuth = () => useContext(AuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}
export const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      // Decode the JWT token to extract the user ID
      const tokenParts = accessToken.split('.');
      const encodedPayload = tokenParts[1];
      const decodedPayload = Buffer.from(encodedPayload, 'base64').toString();
      console.log({ decodedPayload });
      const { sub } = JSON.parse(decodedPayload);

      setIsLoggedIn(true);
      setUserId(sub);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const register = useCallback(
    async (credentials: { name: string; email: string; password: string }) => {
      const response = await fetch('/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 201) {
        return Promise.resolve();
      } else {
        const data = await response.json();
        const error = new Error(data.message);
        return Promise.reject(error);
      }
    },
    []
  );

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.status !== 200) {
        const data = await response.json();
        return Promise.reject(data.message);
      }
      return Promise.resolve();
    },
    []
  );

  const contextValue = useMemo(
    () => ({ isLoggedIn, userId, register, login }),
    [isLoggedIn, userId, register, login]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export interface IWithAppContextContainerProps {
  children?: React.ReactNode | React.ReactNode[];
}
export const withAppContextContainer = <ComponentProps extends object>(
  WrappedComponent: React.ComponentType<ComponentProps>
) => {
  const WithAppContextContainer: React.FC<
    ComponentProps & IWithAppContextContainerProps
  > = (props) => {
    return (
      <AuthProvider>
        <AppContainer>
          <Navigation />
          <div className="flex flex-col items-center gap-20 py-20">
            <WrappedComponent {...(props as ComponentProps)} />
          </div>
        </AppContainer>
      </AuthProvider>
    );
  };

  return WithAppContextContainer;
};
