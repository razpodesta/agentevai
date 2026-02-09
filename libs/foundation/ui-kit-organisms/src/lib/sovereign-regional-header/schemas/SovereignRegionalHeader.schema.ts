/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeaderSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision
 */

import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

/**
 * @name SovereignRegionalHeaderSchema
 * @description ADN que ancora as propriedades do cabeçalho regional.
 */
export const SovereignRegionalHeaderSchema = z.object({
  regionName: z.string().min(2).describe('Nome canônico da localidade.'),

  regionSlug: RegionSlugSchema,

  stateCode: z.string().length(2).toUpperCase()
    .describe('Sigla da Unidade Federativa.'),

  countryCode: SovereignCountrySchema,

  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL'])
    .default('STABLE'),

  /** Dicionário injetado pelo InternationalizationEngine na App Shell */
  dictionary: z.record(z.any()).describe('Fragmento de dicionário consolidado.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignRegionalHeader = z.infer<typeof SovereignRegionalHeaderSchema>;
