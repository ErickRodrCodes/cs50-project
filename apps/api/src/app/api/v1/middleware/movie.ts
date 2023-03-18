import { IMovie } from "@project14-8-6/api-interfaces";
import { Database } from "./db";

export class MovieMiddleware {

  static async createMovie(movie:IMovie): Promise<any> {
    const {
      adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
    } = movie;

    const existingMovie = await MovieMiddleware.getMovie(id);
    console.log({existingMovie});
    if (existingMovie.length === 0) {
      const result =  await Database.execute(`
      INSERT INTO movies (
        adult, backdrop_path, genre_ids, id, original_language, original_title,
        overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `, [adult, backdrop_path, genre_ids.join(','), id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count]);
      return result;
    }
    return null;
  }

  static async getMovie(id:number): Promise<any[]> {
    const record = await Database.query(`
    SELECT * FROM movies WHERE id = ?;
    `, [id]);
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

  static async fetchMoviesFromTMDBAndSave(): Promise<any> {
    const data = await MovieMiddleware.fetchMoviesFromTMDB();
    const movies = data.results;
    const createdMovies = movies.map(async (movie:IMovie) => {
      return await MovieMiddleware.createMovie(movie);
    });
    const createdIds = Promise.all(createdMovies)
    return createdIds;
  }
}
