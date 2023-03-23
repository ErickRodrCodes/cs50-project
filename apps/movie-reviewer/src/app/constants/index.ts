export const ApiVersion = '/api/v1';

export class RouteConstants {
  static readonly ROOT = '/';
  static readonly LOGIN = '/login';
  static readonly LOGOUT = '/logout';
  static readonly REGISTER = '/register';
}

export class APIRouteConstants {
  static readonly USER_REGISTRATION = `${ApiVersion}/user/register`;
  static readonly USER_LOGIN = `${ApiVersion}/user/login`;
  static readonly USER_LOGOUT = `${ApiVersion}/user/logout`;
  static readonly MOVIE_LIST = `${ApiVersion}/movie/list`;
  static MOVIE_ID(id: number) {
    return `${ApiVersion}/movie/${id}`;
  }

  static MOVIE_ID_REVIEWS(id: number) {
    return `${ApiVersion}/movie/${id}/reviews`;
  }
}
