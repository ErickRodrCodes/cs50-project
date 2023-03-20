/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from 'react-router-dom';
import { useAuth } from '../AppContext';

export function Navigation() {
  const { isLoggedIn, userId } = useAuth();

  return (
    <div className="navbar bg-base-100 bg-primary rounded-box mt-3">
      <div className="flex-1 gap-2">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Movie Reviewer
        </Link>
      </div>

      <div className="flex-none flex gap-2">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-active btn-circle avatar flex"
            >
              <div
                className="w-10 rounded-full bg-base-100  justify-items-center content-center"
                style={{ display: 'flex' }}
              >
                <div className="m-auto">JR</div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to={'/registration'} tabIndex={1} className="btn btn-sm">
              Register
            </Link>

            <Link to={'/login'} className="btn btn-sm" tabIndex={2}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
