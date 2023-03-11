import * as bcrypt from 'bcrypt';
import { Database } from "./db";

export class UserMiddleware {

  static async hashPassword(password): Promise<string> {
    try{
      const sal = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, sal);
    } catch(e){
      console.log(e);
    }
  }

  static async createNewUser(username, user_hash) {
    return await Database.execute('INSERT INTO users (username, passowrd_hash) VALUES (?, ?)', [username, user_hash]);
  }

  static async getUserByUsername(username) {
    return await Database.execute('SELECT * FROM users WHERE username = ?', [username]);
  }

  static async isValidUser(username, password) {
    try {
      const recordset = await UserMiddleware.getUserByUsername(username);
      const user = recordset[0];
      if (user) {
        return await UserMiddleware.verifyPassword(password, user.user_hash);
      }
      return false;
    } catch(e){
      console.log(e);
      return false;
    }
  }

  static async verifyPassword(password, user_hash) {
    try {
      return await bcrypt.compare(password, user_hash);
    } catch(e){
      console.log(e);
      return false;
    }
  }
}
