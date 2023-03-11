/* eslint-disable @typescript-eslint/no-explicit-any */
import * as session from 'express-session';
import * as sqlite3 from 'sqlite3';

export class SQLLiteStore extends session.Store {


  private db: any;
  constructor(options){
    super(options);
    this.db = new sqlite3.Database(options.db);
    this.db.run('CREATE TABLE IF NOT EXISTS session_store (sid varchar primary key, data text, expires integer)', (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  get(sid, callback){
    this.db.get('SELECT * FROM session_store WHERE sid = ?', [sid], (err, row) => {
      if(err){
        return callback(err);
      }

      if(!row){
        return callback();
      }
      const data = JSON.parse(row.data);
      return callback(null, data);
    });
  }

  set(sid, session, callback){
    const dateExpires = Date.now() +1000*60*60*24;
    this.db.run('INSERT OR REPLACE INTO session_store (sid, data, expires) VALUES (?, ?, ?)',
    [sid, JSON.stringify(session), dateExpires], callback);
  }

  all(callback) {
    this.db.all('SELECT sid FROM session_store', (err, rows) => {
      if (err) {
        return callback(err);
      }
      const sids = rows.map(row => row.sid);
      return callback(null, sids);
    });
  }

  destroy(sid, callback) {
    this.db.run('DELETE FROM session_store WHERE sid = ?', [sid], callback);
  }
}
