export const ApiVersion = '/api/v1';

export class RouteConstants {
  static readonly ROOT = '/';
  static readonly LOGIN = '/login';
  static readonly LOGOUT = '/logout';
  static readonly REGISTER = '/register';
  static readonly MOVIE_DETAILS = `movie/:id`;
  static readonly MOVIE_REVIEWS = `movie/:id/reviews`;
}

export class APIRouteConstants {
  static readonly USER_REGISTRATION = `${ApiVersion}/user/register`;
  static readonly USER_LOGIN = `${ApiVersion}/user/login`;
  static readonly USER_LOGOUT = `${ApiVersion}/user/logout`;
  static readonly MOVIE_LIST = `${ApiVersion}/movie/list`;
  static readonly MOVIE_DETAILS = `${ApiVersion}/movie/:id`;
  static readonly MOVIE_REVIEWS = `${ApiVersion}/movie/:id/reviews`;
  static MOVIE_ID(id: string) {
    return `${ApiVersion}/movie/${id}`;
  }

  static MOVIE_ID_REVIEWS(id: string) {
    return `${ApiVersion}/movie/${id}/reviews`;
  }
}
