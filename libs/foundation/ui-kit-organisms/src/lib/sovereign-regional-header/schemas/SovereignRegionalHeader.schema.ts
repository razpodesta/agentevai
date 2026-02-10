/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeaderSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN que ancora a autoridade regional. Saneado para garantir
 * a sincronia de rastro forense e integridade léxica tri-lingual.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ZOD-V4-SYNC: Uso de construtores de topo e selagem imutável.
 */

import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

/**
 * @name SovereignRegionalHeaderInputBaseSchema
 * @description Definição estrutural bruta do cabeçalho regional.
 */
export const SovereignRegionalHeaderInputBaseSchema = z.object({
  regionName: z.string()
    .min(2)
    .describe('Nome amigável da localidade para exibição editorial.'),

  regionSlug: RegionSlugSchema
    .describe('Identificador único para ruteamento geográfico.'),

  stateCode: z.string()
    .length(2)
    .toUpperCase()
    .describe('Sigla da Unidade Federativa (UF).'),

  countryCode: SovereignCountrySchema,

  pulseIntensity: z.enum(['STABLE', 'VIBRANT', 'CRITICAL'])
    .default('STABLE')
    .describe('Nível de atividade neural detectado na região.'),

  /**
   * @section Sincronia de Infraestrutura (Cura do Erro TS2322)
   * Contrato estrito de profundidade: Categoria -> Chave -> Valor.
   */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Silo linguístico regionalizado e validado pelo motor i18n.'),

  /** Sincronia de Rastro Forense (Cura do Erro TS2353) */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')

}).passthrough();

/**
 * @name SovereignRegionalHeaderInputSchema
 * @section Selagem Nominal
 */
export const SovereignRegionalHeaderInputSchema = SovereignRegionalHeaderInputBaseSchema
  .brand<'SovereignRegionalHeaderInput'>()
  .readonly();

export type ISovereignRegionalHeader = z.infer<typeof SovereignRegionalHeaderInputSchema>;
