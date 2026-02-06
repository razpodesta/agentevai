import { render } from '@testing-library/react';

import ComplaintsUi from './complaints-ui';

describe('ComplaintsUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComplaintsUi />);
    expect(baseElement).toBeTruthy();
  });
});
