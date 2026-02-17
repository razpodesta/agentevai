/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignConsciousness
 * @version 7.0.1
 * @protocol OEDP-V7.0 - Zenith Orchestration
 * @description Ponto de ignição da consciência sistêmica.
 * CURADO: Erradicado erro TS2345 via selagem nominal do payload de telemetria.
 */

import {
  SovereignLogger,
  SovereignLoggerSchema
} from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  TransmuteGeopoliticalIdentifier,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Zenith */
import {
  SovereignConsciousnessSchema,
  type ISovereignConsciousness
} from './schemas/SovereignConsciousness.schema.js';

export interface ISovereignConsciousnessPacket extends ISovereignConsciousness {
  readonly correlationIdentifier: string;
  readonly apparatusFingerprint: string;
  readonly ignitionLatencyInMilliseconds: number;
}

/**
 * @name CreateSovereignConsciousness
 * @function
 * @description Transmuta snapshots de infraestrutura em consciência selada.
 */
export const CreateSovereignConsciousness = (
  infrastructureSnapshot: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): ISovereignConsciousnessPacket => {
  const startTimestamp = performance.now();
  const apparatusName = 'SovereignConsciousness';

  try {
    // 1. ADUANA DE ADN (Fixação da Realidade)
    const contextAsSovereign = SovereignConsciousnessSchema.parse(infrastructureSnapshot);

    // 2. SINCRONIA GEOPOLÍTICA (Trindade Territorial)
    const routeSlug = TransmuteGeopoliticalIdentifier.countryToRoute(
      contextAsSovereign.geography.countryCode,
      correlationIdentifier,
      dictionary
    );

    const endTimestamp = performance.now();
    const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 3. TELEMETRIA SINCRO (Cura TS2345: Selagem via Schema)
    /**
     * @section Selagem_de_Rastro
     * O parse do SovereignLoggerSchema injeta a marca nominal [$brand]
     * exigida pelo motor de telemetria Zenith.
     */
    const telemetryPayload = SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'CONSCIOUSNESS_IGNITED',
      semanticMessage: `Consciência ancorada via rota [${routeSlug}] em ${ignitionLatency}ms.`,
      correlationIdentifier,
      executionLatencyInMilliseconds: ignitionLatency
    });

    SovereignLogger(telemetryPayload);

    return Object.freeze({
      ...contextAsSovereign,
      correlationIdentifier,
      apparatusFingerprint: `AGV-CONSC-7.0-${routeSlug}`,
      ignitionLatencyInMilliseconds: ignitionLatency
    });

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-CORE-0001'),
      apparatus: apparatusName,
      location: 'libs/foundation/sovereign-consciousness/src/lib/ancestry/sovereign-consciousness/SovereignConsciousness.ts',
      correlationIdentifier,
      severity: 'FATAL'
    });
  }
};
