import { render } from '@testing-library/react';

import Registration from './index';

describe('Registration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Registration />);
    expect(baseElement).toBeTruthy();
  });
});
