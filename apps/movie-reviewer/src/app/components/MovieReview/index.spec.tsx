import { render } from '@testing-library/react';

import MovieReview from './index';

describe('MovieReview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MovieReview />);
    expect(baseElement).toBeTruthy();
  });
});
