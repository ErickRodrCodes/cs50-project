import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { RouteConstants } from '../constants';
import Cookies from 'js-cookie';

function http(): AxiosInstance {
  const api: AxiosInstance = axios.create({
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // remove all cookies
        Cookies.remove('accessToken');
        // Unauthorized, redirect the user to the login page
        window.location.href = RouteConstants.LOGIN;
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export default http();
