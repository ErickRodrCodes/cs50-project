import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface MovieDetailsProps {}

export function MovieDetails(props: MovieDetailsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MovieDetails!</h1>
    </div>
  );
}

export default MovieDetails;
