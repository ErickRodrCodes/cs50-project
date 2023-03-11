import { IMovie } from "@project14-8-6/api-interfaces";
import { Database } from "./db";

export class MovieMiddleware {

  static async createMovie(movie:IMovie) {
    return await Database.execute(`
    INSERT INTO movies (
      adult, backdrop_path, genre_ids, id, original_language, original_title,
      overview, popularity, poster_path, release_date, title, video, vote_average, vote_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [movie]);
  }

}


// const values = [0, '/8s4h9friP6Ci3adRGahHARVd76E.jpg', '28,878,53', 460465, 'en', 'Mortal Kombat', 'Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung''s best warrior, Sub-Zero, seeks out and trains with Earth''s greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.', 2656.118, '/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg', '2021-04-07', 'Mortal Kombat', 0, 7.6, 1538];

// // Example using SQLite3 driver
// db.run('INSERT INTO movies (adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Movie inserted successfully!');
//   }
// });

// // Example using Sequelize ORM
// Movie.create({
//   adult: false,
//   backdrop_path: '/8s4h9friP6Ci3adRGahHARVd76E.jpg',
//   genre_ids: '28,878,53',
//   id: 460465,
//   original_language: 'en',
//   original_title: 'Mortal Kombat',
//   overview: 'Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung''s best warrior, Sub-Zero, seeks out and trains with Earth''s greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.',
//   popularity: 2656.118,
//   poster_path: '/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg',
//   release_date: '2021-04-07',
//   title: 'Mortal Kombat',
//   video: false,
//   vote_average: 7.6,
//   vote_count: 1538
// }).then(() => {
//   console.log('Movie inserted successfully!');
// }).catch((err) => {
//   console.error(err);
// });
