/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { APIRouteConstants, RouteConstants } from '../../constants';
import {} from 'react-router-dom';

/* eslint-disable-next-line */
export interface RegistrationProps {}

export function Registration(props: RegistrationProps) {
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('password') !== data.get('passwordConfirmation')) {
      setRegistrationError(true);
      setRegistrationErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(APIRouteConstants.USER_REGISTRATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      console.log({ response });

      if (!response.ok) {
        console.log({ response });
        setRegistrationError(true);
        const json = await response.json();
        setRegistrationErrorMessage(json.message);
        return;
      }

      setRegistrationError(false);
      setRegistrationErrorMessage('');
      setRegistrationSuccess(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === !200) {
        setRegistrationError(true);
        setRegistrationErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center -mt-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          {registrationSuccess ? (
            <>Registration Successful</>
          ) : (
            <>Register a new account</>
          )}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-base-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {registrationSuccess ? (
            <div className="space-y-6">
              <div>
                <a
                  href={RouteConstants.LOGIN}
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Registration Sucessful. Click here to login
                </a>
              </div>
            </div>
          ) : (
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 p-1 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 p-1 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 p-1 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {registrationError ? (
                <div className="flex flex-row alert-warning rounded justify-center gap-3 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-xs my-auto">
                    {registrationErrorMessage}
                  </span>
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registration;
