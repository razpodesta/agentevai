import { render } from '@testing-library/react';

import CommunityUi from './community-ui';

describe('CommunityUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommunityUi />);
    expect(baseElement).toBeTruthy();
  });
});
