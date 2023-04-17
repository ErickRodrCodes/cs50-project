import axios from 'axios';
import { RouteConstants } from '../constants';

const http = axios.create({});

/**
 * we need to intercept every call and check if the response is 401, which means the user is not authenticated
 * or the token has expired. If that's the case, we redirect the user to the login page.
 */
http.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = RouteConstants.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default http;
