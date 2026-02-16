import { syntheticIngestion } from './synthetic-ingestion';

describe('syntheticIngestion', () => {
  it('should work', () => {
    expect(syntheticIngestion()).toEqual('synthetic-ingestion');
  });
});
