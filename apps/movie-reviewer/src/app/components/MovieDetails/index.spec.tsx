import { render } from '@testing-library/react';

import MovieDetails from './index';

describe('MovieDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MovieDetails />);
    expect(baseElement).toBeTruthy();
  });
});
