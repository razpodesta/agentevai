/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUISchema
 * @version 6.5.8
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para o simulador de conversão publicitária regional.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded Types) 
 */
export const AdFormatSchema = z.enum([
  'EDITORIAL_NATIVE_BANNER',
  'SPONSORED_FORENSIC_REPORT',
  'CITIZEN_REWARD_AD',
  'REGIONAL_STORY_INJECTION'
])
.describe('Formatos de conversão autorizados para o enxame regional.')
.brand<'AdFormat'>();

export type AdFormat = z.infer<typeof AdFormatSchema>;

/** 
 * @name AdVantagePreviewUIInputSchema 
 * @description Aduana de entrada estrita com selagem nominal.
 */
export const AdVantagePreviewUIInputSchema = z.object({
  activeFormat: AdFormatSchema.default('EDITORIAL_NATIVE_BANNER' as AdFormat),
  
  regionName: z.string()
    .min(2).max(50)
    .describe('Nome da localidade para ancoragem de rastro (ex: Florianópolis).'),

  advertiserBrandName: z.string()
    .min(2).max(50)
    .describe('Identificador da instituição ou parceiro soberano.'),

  /** Silo linguístico tipado para o aparato */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Dicionário estruturado validado pelo motor i18n.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada operativa atual.')
})
.brand<'AdVantagePreviewUIInput'>()
.readonly();

export type IAdVantagePreviewUIInput = z.infer<typeof AdVantagePreviewUIInputSchema>;