import { withAppContextContainer } from '../../components/AppContext';
import { MovieDetails } from '../../components/MovieDetails';

const MovieDetailsPageComponent = (props: any) => {
  return <MovieDetails />;
};

export const MovieDetailsPage = withAppContextContainer(
  MovieDetailsPageComponent
);
