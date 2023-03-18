import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface MovieListProps {}

export function MovieList(props: MovieListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MovieList!</h1>
    </div>
  );
}

export default MovieList;
