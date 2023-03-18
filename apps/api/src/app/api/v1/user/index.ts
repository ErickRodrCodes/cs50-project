import { Request, Response, Router } from 'express';
import { UserMiddleware } from '../middleware/user';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { IUsers } from '@project14-8-6/api-interfaces';
import jwt from 'jsonwebtoken';


const userRouter = Router();


const registerSchema = z.object({
  username: z.string().nonempty({ message: 'Username cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);

    // Check if the user already exists
    const existingUser = await UserMiddleware.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)

    const newUser:IUsers = {
      username,
      email,
      password_hash: hash
    };

    // create a new user
    await UserMiddleware.createNewUser(newUser);

    // return the newly created user
    return res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    return res.status(422).json({ errors: error.errors });
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).send({message: 'Incorrect email or password'});
  }
  // Check if the user already exists
  const existingUser = await UserMiddleware.getUserByEmail(email);
  if (!existingUser) {
    return res.status(409).json({ message: 'Incorrect email or password' });
  }

  const isValidUser = await UserMiddleware.isValidUserByEmail(email, password);
  if(!isValidUser){
    return res.status(409).json({ message: 'Incorrect email or password' });
  }

  // Create a JWT token
  const accessToken = jwt.sign({ userId: existingUser[0].id_user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  // Set the JWT token as a cookie
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: req.secure && req.hostname !== 'localhost' });

  // Return the user object
  return res.status(200).json({ username: existingUser[0].username, email: existingUser[0].email });
});

userRouter.get('/logout', (req, res) => {
  // Clear the access token cookie
  res.clearCookie('accessToken');

  // Return a success message
  return res.status(200).json({ message: 'User logged out successfully' });
});



userRouter.get('/list', (req, res) => {
  const users = UserMiddleware.getAllUsers();
  console.log({users})
  return res.status(200).send({ message: 'List of users' });
});

export default userRouter;
