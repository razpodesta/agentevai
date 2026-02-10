/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignIdentityPulseSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Visual Authority ADN
 * @description ADN que define a estrutura inalterável do pulso de identidade regional.
 * Sincronizado para erradicar falhas de rastro forense e otimizar a performance de ignição.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZOD-V4-SYNC: Uso de construtores de elite e precedência de modificadores.
 */

import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';

/**
 * @name SovereignIdentityPulseInputSchema
 * @description Aduana de entrada estrita para o indicador cinético de soberania.
 */
export const SovereignIdentityPulseInputSchema = z.object({
  regionName: z.string()
    .min(2)
    .describe('Nome amigável da localidade para exibição editorial (ex: Florianópolis).'),

  regionSlug: z.string()
    .min(2)
    .toLowerCase()
    .describe('Identificador único de ruteamento geográfico.'),

  stateAbbreviation: z.string()
    .length(2)
    .toUpperCase()
    .describe('Sigla da Unidade Federativa correspondente.'),

  countryCode: SovereignCountrySchema
    .describe('Âncora de soberania nacional validada pelo Manifesto 0018.'),

  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL'])
    .default('STABLE')
    .describe('Nível de atividade neural detectado para modulação cinética.'),

  /**
   * @section Soberania Linguística
   * Injeção do rastro semântico regional.
   */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Fragmento de dicionário regionalizado para humanização do aparato.'),

  /** Sincronia de Rastro Forense (Cura do Erro TS2353) */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')

}).readonly();

export type ISovereignIdentityPulse = z.infer<typeof SovereignIdentityPulseInputSchema>;
