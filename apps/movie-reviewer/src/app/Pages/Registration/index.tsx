import { withAppContextContainer } from '../../components/AppContext';
import Registration from '../../components/Registration';

export function RegistrationPageComponent() {
  return <Registration />;
}

export const RegistrationPage = withAppContextContainer(
  RegistrationPageComponent
);
