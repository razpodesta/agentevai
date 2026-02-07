/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JestConfig (Internationalization Engine)
 */
export default {
  displayName: 'internationalization-engine',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/foundation/internationalization-engine',
};
