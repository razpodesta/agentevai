/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRootLayout.schema
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Internal Mirroring
 * @description ADN de elite para a base de infraestrutura global.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral exaustiva.
 */

import { z } from 'zod';

/**
 * @name SovereignRootLayoutInputSchema
 * @description Aduana de entrada estrita para o layout de topo.
 */
export const SovereignRootLayoutInputSchema = z.object({
  /** Conteúdo renderizado pela árvore React descendente */
  children: z.custom<React.ReactNode>()
    .describe('O rastro de renderização das páginas e layouts de segmento.'),

  /** Identificador Zenith recuperado via rastro de borda */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável injetado pelo Middleware para correlação total.'),

  /** Silo linguístico base para estados de falha global */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Dicionário estruturado para mensagens de sistema e erros de búnquer.')
})
.brand<'SovereignRootLayoutInput'>()
.readonly();

export type ISovereignRootLayoutInput = z.infer<typeof SovereignRootLayoutInputSchema>;
