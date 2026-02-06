import { render } from '@testing-library/react';

import UiKitOrganisms from './ui-kit-organisms';

describe('UiKitOrganisms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiKitOrganisms />);
    expect(baseElement).toBeTruthy();
  });
});
