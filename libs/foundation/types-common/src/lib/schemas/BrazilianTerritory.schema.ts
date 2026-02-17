/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus BrazilianTerritorySchema
 * @version 7.1.0
 * @protocol OEDP-V7.0 - Foundation SSOT
 * @description Única Fonte de Verdade para identificadores geográficos e rastro de saúde.
 */

import { z } from 'zod';

/**
 * @section Dimensões Nominais (Branded Types)
 * CURADO: Exportação explícita de tipos para satisfazer o Hub de Fundação.
 */

export const IbgeCodeSchema = z.number()
  .int()
  .positive()
  .describe('Código numérico oficial do IBGE para identificação de municípios.')
  .brand<'IbgeCode'>();

export type IbgeCode = z.infer<typeof IbgeCodeSchema>;

export const BrazilianStateCodeSchema = z.string()
  .length(2)
  .toUpperCase()
  .describe('Sigla da Unidade Federativa (UF) em conformidade com o rastro do IBGE.')
  .brand<'BrazilianStateCode'>();

export type BrazilianStateCode = z.infer<typeof BrazilianStateCodeSchema>;

export const RegionSlugSchema = z.string()
  .min(2)
  .toLowerCase()
  .describe('Identificador inalterável de ruteamento geográfico (URL friendly).')
  .brand<'RegionSlug'>();

export type RegionSlug = z.infer<typeof RegionSlugSchema>;

export const HealthScoreSchema = z.number()
  .min(0)
  .max(100)
  .describe('Índice de integridade sistêmica calculado em tempo real.')
  .brand<'HealthScore'>();

export type HealthScore = z.infer<typeof HealthScoreSchema>;

/**
 * @name BRAZILIAN_STATES_REGISTRY
 * @description Constante de validação para as 27 unidades federativas + Brindes Geopolíticos.
 */
export const BRAZILIAN_STATES_REGISTRY = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'BR', 'EX'
] as const;

export const ValidatedBrazilianStateSchema = z.enum(BRAZILIAN_STATES_REGISTRY)
  .brand<'BrazilianStateCode'>();
