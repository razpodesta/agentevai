/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDiffusionGuardSchema
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Precision
 */

import { z } from 'zod';

/**
 * @name SovereignDiffusionGuardInputSchema
 * @description Aduana de ADN para o aparato de proteção de difusão.
 */
export const SovereignDiffusionGuardInputSchema = z.object({
  isConfirmationRequired: z.boolean().default(true),
  shouldBypassNextTime: z.boolean().default(false),
  targetPlatformName: z.string().min(2),

  /**
   * @section Sincronia Zod v4
   * CURA TS2339: Uso de definição estrutural para funções.
   */
  onConfirm: z.function({
    input: z.tuple([z.boolean().describe('Decisão de bypass do cidadão.')]),
    output: z.void()
  }).describe('Callback de alta prioridade para selagem do consentimento.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para o aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')

}).readonly();

export type ISovereignDiffusionGuard = z.infer<typeof SovereignDiffusionGuardInputSchema>;
