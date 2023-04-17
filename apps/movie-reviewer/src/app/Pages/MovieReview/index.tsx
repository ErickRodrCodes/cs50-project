import { withAppContextContainer } from '../../components/AppContext';
import MovieReview from '../../components/MovieReview';

const MovieReviewPageComponent = () => {
  return <MovieReview />;
};

export const MovieReviewPage = withAppContextContainer(
  MovieReviewPageComponent
);
