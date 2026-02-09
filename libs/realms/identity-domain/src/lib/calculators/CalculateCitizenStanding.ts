/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStanding
 * @version 2.1.0
 * @protocol OEDP-V5.5.1 - God Tier
 * @description Motor de transmutação de eventos sociais em Standing.
 * @policy ZERO-ANY: Saneamento total de tipos.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { ReputationScore, ReputationScoreSchema } from '../schemas/UserIdentity.schema.js';
import {
  CalculateCitizenStandingInputSchema,
  ICalculateCitizenStandingInput
} from './schemas/CalculateCitizenStanding.schema.js';

/**
 * @section Registro de Pesos (Imutável)
 * Centraliza a inteligência de impacto fora da lógica condicional.
 */
const IMPACT_WEIGHT_MAP: Record<string, number> = {
  COMPLAINT_VERIFIED: 50,
  SUPPORT_RECEIVED: 5,
  SUPPORT_GIVEN: 1,
  SENIORITY_MILESTONE: 10,
  ENTROPY_DETECTED: -100,
  FAKE_NEWS_CONFIRMED: -500
};

/**
 * @name CalculateCitizenStanding
 * @function
 * @description Executa a progressão social do cidadão com auditoria integrada.
 */
export const CalculateCitizenStanding = (
  parameters: ICalculateCitizenStandingInput
): ReputationScore => {
  const apparatusName = 'CalculateCitizenStanding';
  const fileLocation = 'libs/realms/identity-domain/src/lib/calculators/CalculateCitizenStanding.ts';

  try {
    // 1. Aduana de ADN (Sincronizada com Branded Types)
    const data = CalculateCitizenStandingInputSchema.parse(parameters);

    // 2. Processamento Cinético
    const baseWeight = IMPACT_WEIGHT_MAP[data.impactType];
    const calculatedDelta = baseWeight * data.neuralMultiplier;

    // 3. Evolução e Clamping
    const rawEvolvedScore = data.currentReputationScore + calculatedDelta;

    // 4. Selagem de Saída (Garante persistência de Marca/Brand)
    const finalScore = ReputationScoreSchema.parse(rawEvolvedScore);

    // 5. Telemetria Forense
    SovereignLogger({
      severity: calculatedDelta < 0 ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'STANDING_EVOLVED',
      message: `Cidadão: ${data.currentReputationScore} -> ${finalScore} [${data.impactType}]`,
      traceIdentifier: data.correlationIdentifier,
      metadata: { delta: calculatedDelta, multiplier: data.neuralMultiplier }
    });

    return finalScore;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-APP-5002',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parameters?.correlationIdentifier || 'NO_TRACE',
      severity: 'HIGH'
    });
  }
};
