import {Request, Response, Router} from 'express'
import { authenticateToken } from '../middleware/auth';
import { MovieMiddleware } from '../middleware/movie';

const movieRouter = Router();

movieRouter.get('/', (req, res) => {
  res.send('Welcome to api!');
});

movieRouter.get('/list', async (req, res) => {
  const data = await MovieMiddleware.getMovies();
  return res.send({ message: 'List of movies', data });
});

movieRouter.put('/create', async (req, res) => {
  const data = await MovieMiddleware.fetchMoviesFromTMDBAndSave();
  return res.send({ message: 'Movies created', data });
})

// Get the details of a movie (authenticated endpoint)
movieRouter.get('/:id', authenticateToken, async (req: Request, res: Response): Promise<any> => {
  const movieId = Number(req.params.id);

  // Find the movie by ID
  const movie = await MovieMiddleware.getMovie(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  // Return the movie details
  if (req.body.redirect) {
    // Redirect the user back to the movie details page after logging in
    const redirectUrl = req.body.redirect;
    res.redirect(redirectUrl);
  } else {
    // Return the movie details
    return res.status(200).json(movie);
  }
});

export default movieRouter;

