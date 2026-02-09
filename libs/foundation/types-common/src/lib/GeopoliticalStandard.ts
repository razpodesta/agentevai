/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeopoliticalStandard
 * @version 1.1.0
 */

import { z } from 'zod';

export const SovereignLocaleSchema = z.enum(['pt-BR', 'es-ES', 'en-US'])
  .describe('Identificador de cultura e normas linguísticas.')
  .brand<'SovereignLocale'>();

export type SovereignLocale = z.infer<typeof SovereignLocaleSchema>;

export const SovereignCountrySchema = z.enum(['BR', 'ES', 'US'])
  .describe('Código de soberania nacional em caixa alta.')
  .brand<'SovereignCountry'>();

export type SovereignCountry = z.infer<typeof SovereignCountrySchema>;

export const SovereignRouteSchema = z.enum(['br', 'es', 'us'])
  .describe('Slug de ruteamento para URLs em caixa baixa.')
  .brand<'SovereignRoute'>();

export type SovereignRoute = z.infer<typeof SovereignRouteSchema>;