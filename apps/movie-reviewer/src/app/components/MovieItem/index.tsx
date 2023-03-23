import { IMovie } from '@project/api-interfaces';
import { Link } from 'react-router-dom';
import { MovieRate } from '../MovieRating';

export function MovieItem(props: IMovie) {
  return (
    <li className="card w-50 bg-base-300 shadow-xl hover:ring-2 hover:ring-indigo-600">
      <div className="mx-auto flex-shrink-0">
        <figure className="p-6 pb-0">
          <img
            loading="lazy"
            src={`https://themoviedb.org/t/p/w220_and_h330_face${props.poster_path}`}
            srcSet={`https://themoviedb.org/t/p/w220_and_h330_face${props.poster_path} 1x, https://themoviedb.org/t/p/w440_and_h660_face${props.poster_path} 2x`}
            alt={props.title}
            className="rounded-xl"
          />
        </figure>
      </div>

      <div className="card-body pt-4 items-center text-center">
        <MovieRate movie={props} />

        <p>Release Date: {props.release_date}</p>
        <div className="card-actions">
          <Link to={`/movie/${props.id}`} className="btn btn-primary">
            See Reviews
          </Link>
        </div>
      </div>
    </li>
  );
}
