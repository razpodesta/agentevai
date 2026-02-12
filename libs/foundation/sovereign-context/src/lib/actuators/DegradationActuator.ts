/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus DegradationActuator
 * @version 1.0.0
 * @description Atuador de homeostase. Interrompe rastro cinético sob estresse (Health < 40).
 */

import { ISovereignContext, SovereignContextSchema } from '../schemas/SovereignContext.schema.js';

const CRITICAL_HEALTH_THRESHOLD = 40;

/**
 * @name ExecuteGracefulDegradation
 * @description Transmuta o contexto para modo de sobrevivência se a integridade cair.
 */
export const ExecuteGracefulDegradation = (
  context: ISovereignContext
): ISovereignContext => {
  const currentHealth = context.systemStatus.healthScore as unknown as number;

  if (currentHealth < CRITICAL_HEALTH_THRESHOLD) {
    // Amputação Cinética: Desativa animações para preservar CPU/GPU do cidadão.
    const degradedData = {
      ...context,
      appearance: {
        ...context.appearance,
        motionProfile: 'NONE' as const
      },
      systemStatus: {
        ...context.systemStatus,
        isDegradedModeActive: true
      }
    };

    return SovereignContextSchema.parse(degradedData);
  }

  return context;
};