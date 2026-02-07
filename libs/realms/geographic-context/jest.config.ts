/**
 * Raz Podestá - MetaShark Tech
 * Aparato: Jest Config for GeographicContext
 */
export default {
  displayName: 'geographic-context',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/realms/geographic-context',
};
