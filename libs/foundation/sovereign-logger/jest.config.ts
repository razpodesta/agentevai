// libs/foundation/sovereign-logger/jest.config.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JestConfig (SovereignLogger)
 * @version 1.2.0
 * @protocol OEDP-V5.5
 * @description Configuração de elite para execução de testes sob o ecossistema Jest.
 */

export default {
  displayName: 'sovereign-logger',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/foundation/sovereign-logger',
  /**
   * @section SOBERANIA DE QUALIDADE
   * Exigimos 100% de cobertura para o sistema de telemetria.
   */
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};