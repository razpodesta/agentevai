import { mediaFrameFactory } from './media-frame-factory';

describe('mediaFrameFactory', () => {
  it('should work', () => {
    expect(mediaFrameFactory()).toEqual('media-frame-factory');
  });
});
