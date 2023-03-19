import { Movies } from '@project/api-interfaces';
import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { MovieMiddleware } from '../middleware/movie';

const movieRouter = Router();

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  review: string;
  rating: number;
}

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
});

// Get the details of a movie (authenticated endpoint)
movieRouter.get(
  '/:id',
  authenticateToken,
  async (req: Request, res: Response): Promise<any> => {
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
  }
);

// Get the reviews of a movie by ID (authenticated endpoint)
movieRouter.get(
  '/:id/reviews',
  authenticateToken,
  async (req: Request, res: Response) => {
    const movieId = Number(req.params.id);

    // Find the movie by ID
    const movie = await MovieMiddleware.getMovie(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Get the reviews of the movie
    const reviews = await MovieMiddleware.getReviewsForMovie(movieId);

    // Return the reviews
    return res.status(200).json(reviews);
  }
);

movieRouter.post(
  '/:id/reviews',
  authenticateToken,
  async (req: Request, res: Response) => {
    const movieId = Number(req.params.id);
    const userId = req.body.userId;
    const reviewText = req.body.review;
    const rating = Number(req.body.rating);

    // Check if the user has already reviewed the movie
    const existingReview = await MovieMiddleware.getReviewForMovieAndUser(
      movieId,
      userId
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this movie' });
    }

    // Create a new review
    const newReview: Review = {
      id: 0, // The ID will be generated automatically by the database
      movieId: movieId,
      userId: userId,
      review: reviewText,
      rating: rating,
    };
    await MovieMiddleware.createReview(newReview);

    // Update the movie rating
    const moviesRecordset: Movies = await MovieMiddleware.getMovie(movieId);
    const movie = moviesRecordset[0];

    // Calculate the new vote count
    const newVoteCount = movie.vote_count + 1;

    // Calculate the new weighted rating
    const newRating =
      (movie.vote_average * movie.vote_count + rating) / newVoteCount;
    movie.vote_average = newRating;
    movie.vote_count = newVoteCount;

    //update the movie
    await MovieMiddleware.updateMovie(movie);

    // Return the new review
    return res.status(200).json(newReview);
  }
);

export default movieRouter;
