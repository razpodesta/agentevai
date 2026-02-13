/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader.schema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para autoridade regional. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';

/** 
 * @name SovereignRegionalHeaderInputSchema 
 * @description Aduana de entrada estrita para o orquestrador de topo regional.
 */
export const SovereignRegionalHeaderInputSchema = z.object({
  regionName: z.string()
    .min(2)
    .describe('Nome editorial da localidade (ex: Florianópolis).'),

  regionSlug: z.string()
    .min(2)
    .toLowerCase()
    .describe('Identificador inalterável de ruteamento.'),

  stateCode: z.string()
    .length(2)
    .toUpperCase()
    .describe('Sigla da Unidade Federativa correspondente.'),

  countryCode: SovereignCountrySchema
    .describe('Âncora de soberania nacional (Manifesto 0018).'),

  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL'])
    .default('STABLE')
    .describe('Nível de atividade neural detectado na região.'),

  /** 
   * @section CURA_ANY 
   * Definição estrita da malha semântica: Apparatus -> Key -> Value 
   */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Silo linguístico regionalizado e tipado.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada operativa atual.')
})
.brand<'SovereignRegionalHeaderInput'>()
.readonly();

export type ISovereignRegionalHeaderInput = z.infer<typeof SovereignRegionalHeaderInputSchema>;