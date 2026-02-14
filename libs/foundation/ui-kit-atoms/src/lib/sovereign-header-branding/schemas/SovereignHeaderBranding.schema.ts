/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignHeaderBranding.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para identidade visual de topo. Sincronizado para Zod V4.
 */

import { z } from 'zod';

/**
 * @name SovereignHeaderBrandingBaseSchema
 * @description Estrutura fundamental permitindo extensões por IAs de Auditoria.
 */
export const SovereignHeaderBrandingBaseSchema = z.object({
  regionName: z.string()
    .min(2)
    .describe('Nome da localidade detectada para ancoragem visual (ex: Florianópolis).'),

  actionSuffix: z.string()
    .min(2)
    .describe('Sufixo cinético regionalizado (ex: em ação).'),

  isInteractive: z.boolean()
    .default(true)
    .describe('Habilita micro-interações de profundidade e hover.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Rastro inalterável da jornada forense atual.')
});

/**
 * @name SovereignHeaderBrandingSchema
 * @section Selagem Nominal Zenith
 */
export const SovereignHeaderBrandingSchema = SovereignHeaderBrandingBaseSchema
  .brand<'SovereignHeaderBranding'>()
  .readonly();

export type ISovereignHeaderBranding = z.infer<typeof SovereignHeaderBrandingSchema>;
