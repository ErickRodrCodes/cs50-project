/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from 'react-router-dom';

import { IMovie } from '@project/api-interfaces';
import { useEffect, useState } from 'react';
import { APIRouteConstants } from '../../constants';
import Cookies from 'js-cookie';
import http from '../../common/http';
import { Helper } from '../../common/helpers';

interface IParams {
  id: string;
}

type RadialProgressProperty = React.CSSProperties & {
  '--value'?: number;
  '--thickness'?: string;
  '--size'?: string;
};

export const MovieDetails = () => {
  const { id } = useParams<any>();
  const [movie, setMovie] = useState<IMovie>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getMovie() {
      try {
        if (id === undefined) return;
        const accessToken = Cookies.get('accessToken');
        const response = await http(APIRouteConstants.MOVIE_ID(id), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data[0]);
        setMovie(response.data[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getMovie();
  }, [id]);

  if (loading && !movie) return <div>Loading...</div>;

  const radialProgress: RadialProgressProperty = {
    '--value': movie!.vote_average * 10,
    '--thickness': '4px',
    '--size': '3rem',
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 right-0 bottom-0  z-0 overflow-hidden bg-cyan-900">
        <img
          className="opacity-5"
          src={Helper.getBackdrop(movie!.backdrop_path)}
          alt={`Poster for ${movie!.title}`}
        />
      </div>
      <div className="relative top-0 left-0 right-0 bottom-0 z-1 flex gap-2 p-4 m-4 ">
        <div className="w-40">
          <img
            className="w-full"
            src={Helper.getPoster(movie!.poster_path)}
            alt={`Poster for ${movie!.title}`}
          />
        </div>
        <div className="grow flex flex-col">
          <h1 className="text-2xl font-bold">{movie!.title}</h1>
          <p className="my-2">{movie!.overview}</p>
          <p className="my-2">Released: {movie!.release_date}</p>
          <div className="grow flex flex-row">
            <div className="p-2 bg-black table max-w-0 max-h-0 rounded-full">
              <div
                className="radial-progress text-primary"
                style={radialProgress}
              >
                <span className="text-white">{movie!.vote_average * 10}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
