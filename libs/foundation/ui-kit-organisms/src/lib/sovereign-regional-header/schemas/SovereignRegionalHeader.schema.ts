/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeaderSchema
 * @version 6.0.0
 */
import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

export const SovereignRegionalHeaderInputSchema = z.object({
  regionName: z.string().min(2).describe('Nome editorial da localidade.'),
  regionSlug: RegionSlugSchema.describe('Identificador de ruteamento.'),
  stateCode: z.string().length(2).toUpperCase(),
  countryCode: SovereignCountrySchema,
  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL']).default('STABLE'),
  dictionary: z.record(z.string(), z.record(z.string(), z.string())),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignRegionalHeaderInput'>()
.readonly();

export type ISovereignRegionalHeaderInput = z.infer<typeof SovereignRegionalHeaderInputSchema>;