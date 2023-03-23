import { IUsers } from '@project/api-interfaces';
import * as bcrypt from 'bcrypt';
import { Database } from './db';

export class UserMiddleware {
  static async hashPassword(password): Promise<string> {
    try {
      const sal = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, sal);
    } catch (e) {
      console.log(e);
    }
  }

  static async createNewUser(params: IUsers) {
    const { username, email, password_hash } = params;
    const ret = await Database.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password_hash]
    );
    console.log({ ret });
    return ret;
  }

  static async getUserByUsername(username: string): Promise<IUsers[]> {
    return await Database.query('SELECT * FROM users WHERE username = ?', [
      username,
    ]);
  }

  static async getUserByEmail(email: string): Promise<IUsers[]> {
    return await Database.query('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async isValidUser(username: string, password: string) {
    try {
      const recordset = await UserMiddleware.getUserByUsername(username);
      const user = recordset[0];
      if (user) {
        return await UserMiddleware.verifyPassword(
          password,
          user.password_hash
        );
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async isValidUserByEmail(email: string, password: string) {
    try {
      const recordset = await UserMiddleware.getUserByEmail(email);
      const user = recordset[0];
      if (user) {
        return await UserMiddleware.verifyPassword(
          password,
          user.password_hash
        );
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async verifyPassword(password, password_hash) {
    try {
      return await bcrypt.compare(password, password_hash);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getAllUsers(): Promise<IUsers[]> {
    return await Database.query('SELECT * FROM users');
  }

  // UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id_user = ?;
}
