/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiSelfHealing
 * @version 6.3.0
 * @protocol OEDP-V6.0 - High Performance Immune System
 * @description Atuador físico de autocura. 
 * CURADO: Erro TS4111 via Acesso de Índice Estrito e Desestruturação de ADN.
 * @policy ZERO-ANY: Saneamento total de tipos e assinaturas.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { type ISystemAuditVerdict } from '@agentevai/ai-neural-auditor';

/** @section Sincronia de ADN */
import {
  SelfHealingExecutionSchema,
  ImmunologicalProtocolSchema,
  type ISelfHealingExecution,
  type ImmunologicalProtocol
} from './schemas/AiSelfHealing.schema.js';

/** @type PhysicalActuatorSignature */
type PhysicalActuatorSignature = (
  veredictTrace: ISystemAuditVerdict
) => Promise<Record<string, unknown>>;

/** @section Registro de Atuadores (Immune Matrix) */
const PHYSICAL_ACTUATORS_REGISTRY: Readonly<Record<string, PhysicalActuatorSignature>> = Object.freeze({
  CACHE_PURGE: async (veredictTrace) => {
    return { status: 'CACHE_FLUSHED', target: veredictTrace['targetApparatus'] };
  },
  SESSION_TERMINATION: async (veredictTrace) => {
    return { status: 'IDENTITIES_REVOKED', auditSource: veredictTrace['auditIdentifier'] };
  },
  ENGINEER_ESCALATION: async (veredictTrace) => {
    return { status: 'SOVEREIGN_ENGINEERS_NOTIFIED', urgencyReference: veredictTrace['diagnosis'] };
  }
});

/**
 * @name ExecuteSelfHealing
 * @function
 * @async
 * @description Orquestra a aplicação física da cura baseada na sentença judicial da IA.
 */
export const ExecuteSelfHealing = async (
  systemVerdict: ISystemAuditVerdict,
  dictionary: ISovereignDictionary
): Promise<ISelfHealingExecution> => {
  const startTimestamp = performance.now();
  const apparatusName = 'AiSelfHealing';
  const fileLocation = 'libs/orchestration/ai-self-healing/src/lib/AiSelfHealing.ts';

  /** 
   * @section CURA_TS4111
   * Acesso via colchetes para propriedades oriundas de assinatura de índice (Zod Loose/Passthrough).
   */
  const correlationIdentifier = systemVerdict['forensicTraceId'] as string;
  const targetApparatus = systemVerdict['targetApparatus'] as string;
  const auditIdentifier = systemVerdict['auditIdentifier'] as string;

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. MAPEAMENTO DE PROTOCOLO (Lógica de Decisão Neural)
    const protocolCode = resolveImmunologicalProtocol(systemVerdict['reconciliationDirective']);
    const protocolKey = protocolCode as unknown as string;

    // 2. TELEMETRIA DE IGNIÇÃO
    SovereignLogger({
      severity: 'WARN',
      apparatus: apparatusName,
      operation: 'HEALING_IGNITION',
      message: translate('logInterventionStart', { 
        protocol: protocolKey, 
        apparatus: targetApparatus 
      }),
      correlationIdentifier
    });

    // 3. EXECUÇÃO FÍSICA
    const actuatorHandler = PHYSICAL_ACTUATORS_REGISTRY[protocolKey] 
      || PHYSICAL_ACTUATORS_REGISTRY['ENGINEER_ESCALATION'];

    const infrastructureResponseSnapshot = await actuatorHandler(systemVerdict);

    // 4. CÁLCULO DE PERFORMANCE
    const endTimestamp = performance.now();
    const executionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 5. SELAGEM DO RASTRO (ADN Zenith)
    return SelfHealingExecutionSchema.parse({
      executionIdentifier: crypto.randomUUID(),
      auditIdentifier: auditIdentifier,
      protocol: protocolCode,
      targetApparatus: targetApparatus,
      executionLatencyInMilliseconds,
      infrastructureReport: infrastructureResponseSnapshot,
      correlationIdentifier
    });

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-COG-2001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'FATAL'
    });
  }
};

/**
 * @name resolveImmunologicalProtocol
 * @private
 */
function resolveImmunologicalProtocol(directiveText: string): ImmunologicalProtocol {
  const normalizedDirective = directiveText.toUpperCase();
  let targetProtocol = 'ENGINEER_ESCALATION';

  if (normalizedDirective.includes('CACHE')) targetProtocol = 'CACHE_PURGE';
  else if (normalizedDirective.includes('SESSION')) targetProtocol = 'SESSION_TERMINATION';
  else if (normalizedDirective.includes('VAULT')) targetProtocol = 'VAULT_KEY_ROTATION';

  return ImmunologicalProtocolSchema.parse(targetProtocol);
}