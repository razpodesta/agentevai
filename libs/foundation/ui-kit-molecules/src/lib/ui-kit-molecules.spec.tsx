import { render } from '@testing-library/react';

import UiKitMolecules from './ui-kit-molecules';

describe('UiKitMolecules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiKitMolecules />);
    expect(baseElement).toBeTruthy();
  });
});
