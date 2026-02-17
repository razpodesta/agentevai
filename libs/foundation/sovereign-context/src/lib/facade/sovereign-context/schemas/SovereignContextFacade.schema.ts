/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextFacadeSchema
 * @version 7.0.3
 * @protocol OEDP-V7.0 - Master DNA Zenith
 * @description ADN de Agregação Global.
 * CURADO: Erro TS2719 (Brand Mismatch) erradicado via unificação nominal.
 */

import { z } from 'zod';
import { SovereignConsciousnessSchema } from '@agentevai/sovereign-consciousness';

/**
 * @name SovereignContextFacadeSchema
 * @description O contrato mestre selado com a marca nominal unificada.
 */
export const SovereignContextFacadeSchema = z.object({
  consciousnessSnapshot: SovereignConsciousnessSchema
    .describe('Snapshot inalterável da consciência estática detectada na borda.'),

  sessionMetadata: z.object({
    isHandshakeComplete: z.boolean().default(false),
    lastInteractionTimestamp: z.string().datetime()
  }).readonly()
})
.refine((data) => {
  /** @section CURA_TS4111 */
  const consciousness = data["consciousnessSnapshot"];
  const { geography, language } = consciousness;

  if (geography.countryCode === 'BR' && language.activeLocale !== 'pt-BR') {
    return false;
  }
  return true;
}, {
  message: 'GEOPOLITICAL_INCONSISTENCY: Global Context mismatch.',
  path: ['consciousnessSnapshot', 'language']
})
/**
 * @section UNIFICAÇÃO_DE_BRAND
 * A marca deve ser IDENTICA em todo o fluxo de transmutação.
 */
.brand<'SovereignContextFacade'>()
.readonly();

export type ISovereignContext = z.infer<typeof SovereignContextFacadeSchema>;
