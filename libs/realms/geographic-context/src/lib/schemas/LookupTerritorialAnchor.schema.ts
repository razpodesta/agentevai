/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor.schema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para o rastro de ancoragem via IP (IAL2).
 */

import { z } from 'zod';
import { 
  SovereignCountrySchema, 
  RegionSlugSchema 
} from '@agentevai/sovereign-context';
import { BrazilianStateCodeSchema } from './GeographicRegion.schema.js';

/**
 * @name TerritorialAnchorOutputSchema
 * @description Contrato selado para o provedor de Nível 2 (IP).
 */
export const TerritorialAnchorOutputSchema = z.object({
  territoryName: z.string()
    .min(2)
    .describe('Nome amigável da localidade detectada.'),
    
  stateCode: BrazilianStateCodeSchema
    .describe('Sigla da Unidade Federativa carimbada com marca nominal.'),
    
  countryCode: SovereignCountrySchema,
  
  regionalSlug: RegionSlugSchema
    .describe('Identificador de ruteamento para o Jornal Local.'),

  internetProtocolAddress: z.string().ip()
    .describe('Endereço IP que originou a ancoragem.'),

  isExternalSovereignty: z.boolean()
    .describe('Sinalizador de acesso fora do território brasileiro.')
})
.brand<'TerritorialAnchorOutput'>()
.readonly();

export type ITerritorialAnchorOutput = z.infer<typeof TerritorialAnchorOutputSchema>;