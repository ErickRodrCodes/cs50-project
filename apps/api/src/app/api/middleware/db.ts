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
