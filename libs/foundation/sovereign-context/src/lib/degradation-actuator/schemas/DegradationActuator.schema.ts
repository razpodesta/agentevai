/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus DegradationActuatorSchema
 * @version 7.0.2
 * @protocol OEDP-V7.0 - Master DNA
 */

import { z } from 'zod';
import { SovereignContextFacadeSchema } from '../../facade/sovereign-context/schemas/SovereignContextFacade.schema.js';

export const DegradationActuatorInputSchema = z.object({
  activeContextSnapshot: SovereignContextFacadeSchema
    .describe('O rastro de realidade consolidado para análise de integridade.'),

  healthCriticalThreshold: z.number()
    .min(10).max(90).default(40)
    .describe('Patamar de saúde onde a homeostase é disparada.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
})
.brand<'DegradationActuatorInput'>()
.readonly();

export type IDegradationActuatorInput = z.infer<typeof DegradationActuatorInputSchema>;
