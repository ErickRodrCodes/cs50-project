import * as sqlite3 from 'sqlite3';
import * as path from 'path';

const db =  new sqlite3.Database(
  path.join(__dirname, '..', '..', '..', 'db', 'movie-reviews.db'),
)

export class Database {
  static query = (sql, params = []): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.log({sql, err})
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
  }

  static execute = (sql, params = []): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if(err){
          reject(err);
        }
        resolve({id: this.lastID});
      });
    });
  }
}

export function createMovieTable(): Promise<any> {
  return Database.execute(
    `CREATE TABLE IF NOT EXISTS movies (
      id_movie INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      adult BOOLEAN,
      backdrop_path TEXT,
      genre_ids TEXT,
      id INTEGER,
      original_language TEXT,
      original_title TEXT UNIQUE,
      overview TEXT,
      popularity REAL,
      poster_path TEXT,
      release_date TEXT,
      title TEXT UNIQUE,
      video BOOLEAN,
      vote_average REAL,
      vote_count INTEGER
    )`
  );
}

export function createUserTable(): Promise<any> {
  return Database.execute(
    `CREATE TABLE IF NOT EXISTS users (
      id_user INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );`
  );
}

export function createReviewTable(): Promise<any> {
  return Database.execute(
    `CREATE TABLE IF NOT EXISTS reviews (
      id_review INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      id_movie INTEGER NOT NULL,
      id_user INTEGER NOT NULL,
      review TEXT,
      rating INTEGER,
      FOREIGN KEY(id_movie) REFERENCES movies(id_movie),
      FOREIGN KEY(id_user) REFERENCES users(id_user)
    );`
  );
}

export function createTables(): Promise<any> {
  return Promise.all([createMovieTable(), createUserTable(), createReviewTable()]);
}

export function dropTables(): Promise<any> {
  return Promise.all([
    Database.execute('DROP TABLE IF EXISTS reviews'),
    Database.execute('DROP TABLE IF EXISTS users'),
    Database.execute('DROP TABLE IF EXISTS movies')
  ]);
}
