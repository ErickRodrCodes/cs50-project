import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface MovieReviewProps {}

export function MovieReview(props: MovieReviewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MovieReview!</h1>
    </div>
  );
}

export default MovieReview;
