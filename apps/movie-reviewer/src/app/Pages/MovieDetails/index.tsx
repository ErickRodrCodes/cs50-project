import { withAppContextContainer } from '../../components/AppContext';
import { MovieDetails } from '../../components/MovieDetails';

const MovieDetailsPageComponent = (props: any) => {
  console.log({ props });
  return <MovieDetails />;
};

export const MovieDetailsPage = withAppContextContainer(
  MovieDetailsPageComponent
);
