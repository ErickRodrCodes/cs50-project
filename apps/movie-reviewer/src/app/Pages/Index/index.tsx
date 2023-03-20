import { withAppContextContainer } from '../../components/AppContext';
import MovieList from '../../components/MovieList';

const IndexPageComponent = () => {
  return <MovieList />;
};

export const IndexPage = withAppContextContainer(IndexPageComponent);
