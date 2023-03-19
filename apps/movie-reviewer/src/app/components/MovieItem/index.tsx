import { IMovie } from '@project/api-interfaces';

export function MovieItem(props: IMovie) {
  return (
    <li className="card w-50 bg-base-100 shadow-xl hover:ring-2 hover:ring-indigo-600">
      <div className="mx-auto flex-shrink-0">
        <figure className="p-6">
          <img
            loading="lazy"
            src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.poster_path}`}
            srcSet={`https://themoviedb.org/t/p/w220_and_h330_face${props.poster_path} 1x, https://themoviedb.org/t/p/w440_and_h660_face${props.poster_path} 2x`}
            alt={props.title}
            className="rounded-xl w-full"
          />
        </figure>
      </div>

      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.title}</h2>
        <p>Release Date: {props.release_date}</p>
        <div className="card-actions">
          <button className="btn btn-primary">See Reviews</button>
        </div>
      </div>
    </li>
  );
}
