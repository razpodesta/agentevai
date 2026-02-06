import { supabaseBridge } from './supabase-bridge';

describe('supabaseBridge', () => {
  it('should work', () => {
    expect(supabaseBridge()).toEqual('supabase-bridge');
  });
});
