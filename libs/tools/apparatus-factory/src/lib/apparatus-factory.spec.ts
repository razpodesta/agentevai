import { apparatusFactory } from './apparatus-factory';

describe('apparatusFactory', () => {
  it('should work', () => {
    expect(apparatusFactory()).toEqual('apparatus-factory');
  });
});
