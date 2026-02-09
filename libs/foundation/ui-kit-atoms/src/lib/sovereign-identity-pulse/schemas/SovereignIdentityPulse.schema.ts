/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignIdentityPulseSchema
 * @version 1.3.1
 * @protocol OEDP-V5.5 - High Precision & Kinetic Branding
 * @description ADN para o aparato visual de identidade regional.
 */

import { z } from 'zod';
import { RegionSlugSchema } from '@agentevai/sovereign-context';
/**
 * @section CORREÇÃO TS2724
 * Importação redirecionada para a Bóveda de Contratos (types-common).
 */
import { SovereignCountrySchema } from '@agentevai/types-common';

/**
 * @name SovereignIdentityPulseSchema
 * @description Aduana de ADN para o componente que ancora a soberania territorial na UI.
 */
export const SovereignIdentityPulseSchema = z.object({
  regionName: z.string()
    .min(2, { message: 'REGION_NAME_TOO_SHORT' })
    .describe('Nome amigável da cidade ou estado para exibição (Ex: Florianópolis).'),

  regionSlug: RegionSlugSchema
    .describe('Identificador único para ruteamento dinâmico e SEO.'),

  stateAbbreviation: z.string()
    .length(2)
    .toUpperCase()
    .describe('Sigla da Unidade Federativa para contextualização regional (Ex: SC).'),

  countryCode: SovereignCountrySchema,

  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL'])
    .default('STABLE')
    .describe('Define a frequência e cor da animação do pulso neural.'),

  onInteractionTrigger: z.function({
    input: z.tuple([z.string().describe('Identifier da zona de toque')]),
    output: z.void()
  })
  .optional()
  .describe('Dispatcher para captura de métricas de engajamento visual.'),

}).readonly();

export type ISovereignIdentityPulse = z.infer<typeof SovereignIdentityPulseSchema>;
