import { Router } from 'express';
import { resetDatabase } from '../middleware/db';
import movieRouter from '../movie';
import userRouter from '../user';
import { MovieMiddleware } from '../middleware/movie';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.send({ message: 'Movie-Reviewer API v1.0.0' });
});

indexRouter.use('/user', userRouter);
indexRouter.use('/movie', movieRouter);
indexRouter.get('/initialize', async (req, res) => {
  await resetDatabase();
  await MovieMiddleware.fetchMoviesFromTMDBAndSave();
  res.send({ message: 'Database initialized' });
});

export default indexRouter;
