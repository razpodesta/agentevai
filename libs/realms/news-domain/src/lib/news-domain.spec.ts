import { newsDomain } from './news-domain';

describe('newsDomain', () => {
  it('should work', () => {
    expect(newsDomain()).toEqual('news-domain');
  });
});
