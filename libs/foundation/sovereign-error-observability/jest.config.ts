/**
 * Raz Podestá - MetaShark Tech
 * Aparato: Jest Config for SovereignErrorObservability
 */
export default {
  displayName: 'sovereign-error-observability',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/foundation/sovereign-error-observability',
};
