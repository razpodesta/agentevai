/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignJournalPage.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description Define a integridade de entrada da página mestre regionalizada.
 */

import { z } from 'zod';
import { SovereignLocaleSchema, SovereignRouteSchema } from '@agentevai/types-common';

/** 
 * @name SovereignJournalPageParametersSchema 
 * @description Aduana para rastro de URL (Segmentos dinâmicos do Next.js).
 */
export const SovereignJournalPageParametersSchema = z.object({
  locale: SovereignLocaleSchema,
  country: SovereignRouteSchema.optional().default('br' as any),
  state: z.string().length(2).toLowerCase().optional(),
  city: z.string().min(2).toLowerCase().optional()
})
.brand<'SovereignJournalPageParameters'>()
.readonly();

export type ISovereignJournalPageParameters = z.infer<typeof SovereignJournalPageParametersSchema>;

/**
 * @name SovereignJournalPageInputSchema
 * @description Validação de propriedades de entrada para o componente de página.
 */
export const SovereignJournalPageInputSchema = z.object({
  params: z.promise(z.unknown()).describe('Promessa de parâmetros da rota Next.js.')
})
.brand<'SovereignJournalPageInput'>()
.readonly();

export type ISovereignJournalPageInput = z.infer<typeof SovereignJournalPageInputSchema>;