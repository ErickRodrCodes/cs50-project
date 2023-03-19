import { IMovie, Movies } from '@project/api-interfaces';
import { Database } from './db';

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  review: string;
  rating: number;
}

export class MovieMiddleware {
  static async createMovie(movie: IMovie): Promise<any> {
    const {
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    } = movie;

    const existingMovie = await MovieMiddleware.getMovie(id);
    console.log({ existingMovie });
    if (existingMovie.length === 0) {
      const result = await Database.execute(
        `
      INSERT INTO movies (
        adult, backdrop_path, genre_ids, id, original_language, original_title,
        overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          adult,
          backdrop_path,
          genre_ids.join(','),
          id,
          original_language,
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          video,
          vote_average,
          vote_count,
        ]
      );
      return result;
    }
    return null;
  }

  static async getMovie(id: number): Promise<Movies> {
    const record = await Database.query(
      `
    SELECT * FROM movies WHERE id = ?;
    `,
      [id]
    );
    return record;
  }

  static async getMovies(): Promise<any[]> {
    return await Database.query(`
    SELECT * FROM movies;
    `);
  }

  static async getTotalNumberOfMovies(): Promise<any[]> {
    return await Database.query(`
    SELECT COUNT(*) FROM movies;
    `);
  }

  static async fetchMoviesFromTMDB(): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static updateMovie = async (movie: IMovie): Promise<any> => {
    const {
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    } = movie;
    return await Database.execute(
      `UPDATE movies SET
      adult = ?, backdrop_path = ?, genre_ids = ?, id = ?, original_language = ?, original_title = ?,
      overview = ?, popularity = ?, poster_path = ?, release_date = ?, title = ?, video = ?, vote_average = ?, vote_count = ?
      WHERE id = ?;
    `,
      [
        adult,
        backdrop_path,
        genre_ids.join(','),
        id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count,
        id,
      ]
    );
  };

  static async fetchMoviesFromTMDBAndSave(): Promise<any> {
    const data = await MovieMiddleware.fetchMoviesFromTMDB();
    const movies = data.results;
    const createdMovies = movies.map(async (movie: IMovie) => {
      return await MovieMiddleware.createMovie(movie);
    });
    const createdIds = Promise.all(createdMovies);
    return createdIds;
  }

  static async getReviewsForMovie(movieId: number): Promise<any> {
    const query = 'SELECT * FROM reviews WHERE id_movie = ?';
    const params = [movieId];
    const result = await Database.query(query, params);
    return result;
  }

  static async getReviewForMovieAndUser(
    movieId: number,
    userId: number
  ): Promise<any> {
    const query = 'SELECT * FROM reviews WHERE id_movie = ? AND id_user = ?';
    const params = [movieId, userId];
    return await Database.query(query, params);
  }

  static async createReview(review: Review): Promise<any> {
    const query =
      'INSERT INTO reviews (id_movie, id_user, review, rating) VALUES (?, ?, ?, ?)';
    const params = [
      review.movieId,
      review.userId,
      review.review,
      review.rating,
    ];
    return await Database.execute(query, params);
  }
}
