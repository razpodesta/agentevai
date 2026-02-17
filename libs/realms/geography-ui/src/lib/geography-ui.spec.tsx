import { render } from '@testing-library/react';

import GeographyUi from './geography-ui';

describe('GeographyUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GeographyUi />);
    expect(baseElement).toBeTruthy();
  });
});
