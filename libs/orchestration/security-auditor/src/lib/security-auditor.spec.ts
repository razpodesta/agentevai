import { securityAuditor } from './security-auditor';

describe('securityAuditor', () => {
  it('should work', () => {
    expect(securityAuditor()).toEqual('security-auditor');
  });
});
