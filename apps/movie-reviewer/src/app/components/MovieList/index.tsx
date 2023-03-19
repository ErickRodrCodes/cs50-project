import { IMovie, IMovieListResponse } from '@project/api-interfaces';
import { useEffect, useState } from 'react';
import { MovieItem } from '../MovieItem';

export function MovieList() {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getMovies() {
      const response = await fetch('/api/v1/movie/list');
      const json:IMovieListResponse = await response.json();
      setMovies(json.data);
      setLoading(false);
    }
    getMovies();
  }, []);

  if(loading) return (<div>Loading...</div>);
  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => <MovieItem {...movie} />)}
      </ul>
    </div>
  );
}

export default MovieList;
