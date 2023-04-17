import { Request, Response, Router } from 'express';
import { UserMiddleware } from '../middleware/user';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { IUsers, SessionDateExpires } from '@project/api-interfaces';
import jwt from 'jsonwebtoken';

const userRouter = Router();

const registerSchema = z.object({
  username: z.string().nonempty({ message: 'Username cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);

    // Check if the user already exists
    const existingUser = await UserMiddleware.getUserByEmail(email);
    console.log({ existingUser });
    if (existingUser.length) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser: IUsers = {
      username,
      email,
      password_hash: hash,
    };

    // create a new user
    const createNewUser = await UserMiddleware.createNewUser(newUser);
    console.log({ createNewUser });

    // return the newly created user
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ errors: 'Unexpected server error occured.' });
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Incorrect email or password' });
  }
  // Check if the user already exists
  const existingUser = await UserMiddleware.getUserByEmail(email);
  if (!existingUser) {
    return res
      .status(409)
      .json({ message: 'Email is not registered the system' });
  }

  const isValidUser = await UserMiddleware.isValidUserByEmail(email, password);
  if (!isValidUser) {
    return res.status(409).json({ message: 'Incorrect email or password' });
  }

  // Create a JWT token
  const accessToken = jwt.sign(
    {
      userId: existingUser[0].id_user,
      username: existingUser[0].username,
      email: existingUser[0].email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  // Set the JWT token as a cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: false,
    secure: false,
    path: '/',
  });

  // Redirect the user to the home page
  return res.status(200).json({ message: 'User logged in successfully' });
});

userRouter.get('/logout', (req, res) => {
  // Clear the access token cookie
  res.clearCookie('accessToken');

  // Return a success message
  return res.status(200).json({ message: 'User logged out successfully' });
});

userRouter.get('/list', (req, res) => {
  const users = UserMiddleware.getAllUsers();
  console.log({ users });
  return res.status(200).send({ message: 'List of users' });
});

userRouter.post('/refreshToken', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      const newToken = jwt.sign(
        {
          ...payload,
          exp: SessionDateExpires(),
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ token: newToken });
    }
  });
});

export default userRouter;
