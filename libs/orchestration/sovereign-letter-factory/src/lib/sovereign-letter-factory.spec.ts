import { sovereignLetterFactory } from './sovereign-letter-factory';

describe('sovereignLetterFactory', () => {
  it('should work', () => {
    expect(sovereignLetterFactory()).toEqual('sovereign-letter-factory');
  });
});
