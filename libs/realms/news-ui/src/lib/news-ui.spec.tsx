import { render } from '@testing-library/react';

import NewsUi from './news-ui';

describe('NewsUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsUi />);
    expect(baseElement).toBeTruthy();
  });
});
