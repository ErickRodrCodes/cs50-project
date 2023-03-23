import { IMovie, IMovieListResponse } from '@project/api-interfaces';
import { useEffect, useState } from 'react';
import { APIRouteConstants } from '../../constants';
import { MovieItem } from '../MovieItem';
import { MovieItemLoadingUI } from '../MovieItemLoadingUI';

export function MovieList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getMovies() {
      const response = await fetch(APIRouteConstants.MOVIE_LIST);
      const json: IMovieListResponse = await response.json();
      setMovies(json.data);
      setLoading(false);
    }
    getMovies();
  }, []);

  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <MovieItemLoadingUI key={Math.random() * 1000 + 1} />
            ))
          : movies.map((movie) => <MovieItem {...movie} key={movie.id} />)}
      </ul>
    </div>
  );
}

export default MovieList;
