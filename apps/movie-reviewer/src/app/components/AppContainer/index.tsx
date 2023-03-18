import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface AppContainerProps {}

export function AppContainer(props: AppContainerProps) {
  return (
    <div className="container">
      <h1>Welcome to AppContainer!</h1>
    </div>
  );
}

export default AppContainer;
