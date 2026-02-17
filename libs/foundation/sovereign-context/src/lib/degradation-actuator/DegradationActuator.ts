/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus DegradationActuator
 * @version 7.0.2
 * @protocol OEDP-V7.0 - Zenith Physical Resilience
 * @description Atuador de homeostase. Analisa o pulso de saúde e aplica sanções cinéticas.
 * CURADO: Erradicado erro TS2719 (Brand Mismatch) via re-selagem nominal do retorno.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ATOMIC-STATE: Responsabilidade única sobre o rastro de sobrevivência.
 */

import {
  SovereignLogger,
  SovereignLoggerSchema
} from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Zenith */
import {
  DegradationActuatorInputSchema,
  type IDegradationActuatorInput
} from './schemas/DegradationActuator.schema.js';

/**
 * @section Ponte_de_Autoridade
 * Importamos o esquema da Fachada para garantir que o rastro de retorno
 * porte a marca nominal (Brand) correta para o enxame superior.
 */
import {
  SovereignContextFacadeSchema,
  type ISovereignContext
} from '../facade/sovereign-context/schemas/SovereignContextFacade.schema.js';

/**
 * @name ExecuteGracefulDegradation
 * @function
 * @description Analisa a integridade sistêmica e transmuta a realidade visual para modo de sobrevivência.
 */
export const ExecuteGracefulDegradation = (
  parametersPayload: IDegradationActuatorInput,
  dictionary: ISovereignDictionary
): ISovereignContext => {
  const apparatusName = 'DegradationActuator';
  const startTimestamp = performance.now();

  // 1. ADUANA DE ADN (Ingresso Seguro no Búnquer)
  const data = DegradationActuatorInputSchema.parse(parametersPayload);

  /**
   * @section CURA_TS4111 (Bracket Access)
   * Extração nominal via string literal para evitar colapso de tipo Branded.
   */
  const contextSnapshot = data["activeContextSnapshot"];
  const consciousness = contextSnapshot["consciousnessSnapshot"];
  const currentHealthScore = consciousness.systemStatus.healthScore as unknown as number;

  // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.0.2',
    complexityTier: 'REALM_LOGIC',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, data.correlationIdentifier);

  // 3. DECISÃO DE HOMEOSTASE (Cálculo de Entropia)
  if (currentHealthScore < data.healthCriticalThreshold) {
    const endTimestamp = performance.now();
    const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 4. TELEMETRIA ZENITH (Aduana de Log Selada)
    const telemetryPayload = SovereignLoggerSchema.parse({
      severity: 'WARN',
      apparatusIdentifier: apparatusName,
      operationCode: 'KINETIC_AMPUTATION_ACTIVE',
      semanticMessage: SovereignTranslationEngine.translate(
        dictionary, apparatusName, 'logDegradedActive', { health: currentHealthScore }, data.correlationIdentifier
      ),
      correlationIdentifier: data.correlationIdentifier,
      executionLatencyInMilliseconds: executionLatency,
      forensicMetadata: { healthThreshold: data.healthCriticalThreshold }
    });

    SovereignLogger(telemetryPayload);

    // 5. TRANSMUTAÇÃO PARA MODO DE SOBREVIVÊNCIA (Re-selagem Nominal)
    /**
     * @section CURA_TS2719_ZENITH
     * Realizamos o parse do 'SovereignContextFacadeSchema' para garantir que o objeto
     * retornado seja uma instância nominal reconhecida pela Fachada.
     */
    return SovereignContextFacadeSchema.parse({
      ...contextSnapshot,
      consciousnessSnapshot: {
        ...consciousness,
        appearance: {
          ...consciousness.appearance,
          motionProfile: 'NONE'
        },
        systemStatus: {
          ...consciousness.systemStatus,
          isDegradedModeActive: true
        }
      }
    });
  }

  // 6. RETORNO NOMINAL ESTÁVEL
  return SovereignContextFacadeSchema.parse(contextSnapshot);
};
