/**
 * Raz Podestá - MetaShark Tech
 * Aparato: Jest Config for SovereignDataVault
 * Foco: Garantir que os algoritmos de criptografia sejam testados em ambiente estável.
 */
export default {
  displayName: 'sovereign-data-vault',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/foundation/sovereign-data-vault',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
