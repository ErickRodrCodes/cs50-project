import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface RegistrationProps {}

export function Registration(props: RegistrationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Registration!</h1>
    </div>
  );
}

export default Registration;
