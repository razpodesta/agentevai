/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUISchema
 * @version 2.2.0
 * @protocol OEDP-V5.5.1 - High Precision Audit
 * @description ADN de simulação publicitária regional com saneamento Zod V4.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal
 */
export const AdFormatSchema = z.enum([
  'EDITORIAL_BANNER',
  'NATIVE_INJECTION',
  'REGIONAL_STORY'
]).describe('Formatos de mídia autorizados para exibição no portal.')
  .brand<'AdFormat'>();

export type AdFormat = z.infer<typeof AdFormatSchema>;

/**
 * @name AdVantagePreviewUIInputSchema
 * @description Aduana de entrada para o laboratório de simulação.
 */
export const AdVantagePreviewUIInputSchema = z.object({
  activeFormat: AdFormatSchema.default('NATIVE_INJECTION' as AdFormat),

  regionName: z.string()
    .min(2)
    .describe('Nome canônico da localidade para interpolação semântica.'),

  advertiserBrandName: z.string()
    .min(2)
    .describe('Identificador da marca para selagem de patrocínio.'),

  /** 
   * @section Sincronia Zod V4 (Fix TS2554)
   * Substituído z.record(z.any()) por definição explícita de par Chave/Valor.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Fragmento de dicionário regional para o Ad-Vantage Lab.'),

  /** Sincronia Zod V4: Uso do construtor de topo */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense no laboratório.')

}).readonly();

export type IAdVantagePreviewUIInput = z.infer<typeof AdVantagePreviewUIInputSchema>;