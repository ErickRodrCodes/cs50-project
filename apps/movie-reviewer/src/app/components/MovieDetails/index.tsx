import { useParams } from 'react-router-dom';

import { IMovie } from '@project/api-interfaces';
import { useEffect, useState } from 'react';
import { APIRouteConstants } from '../../constants';
import Cookies from 'js-cookie';
import http from '../../common/http';

interface IParams {
  id: string;
}

export const MovieDetails = () => {
  const { id } = useParams<any>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  console.log({ id });

  useEffect(() => {
    async function getMovie() {
      if (id === undefined) return;
      const accessToken = Cookies.get('accessToken');
      const response = await http.get(
        APIRouteConstants.MOVIE_ID(parseInt(id)),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMovie(response.data);
    }
    getMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <img
        className="my-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        src={movie.backdrop_path}
        alt={`Poster for ${movie.title}`}
      />
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p className="my-2">{movie.overview}</p>
      <p className="my-2">Released: {movie.release_date}</p>
    </div>
  );
};
