/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslatePostalCodeToMunicipalitySchema
 * @version 1.0.0
 * @protocol OEDP-V5.5 - High Precision
 * @description Define a estrutura de entrada e saída para a tradução de rastro postal.
 */

import { z } from 'zod';
import { IbgeCodeSchema, BrazilianStateCodeSchema } from './GeographicRegion.schema.js';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

/**
 * @name TranslatePostalCodeResultSchema
 * @description ADN de saída purificado para integração com o Jornal Local.
 */
export const TranslatePostalCodeResultSchema = z.object({
  identifier: IbgeCodeSchema.describe('Código IBGE transmutado em número Branded.'),
  name: z.string().min(2).describe('Nome canônico da cidade.'),
  stateCode: BrazilianStateCodeSchema,
  slug: RegionSlugSchema.describe('Slug de ruteamento gerado automaticamente.'),
}).readonly();

export type ITranslatePostalCodeResult = z.infer<typeof TranslatePostalCodeResultSchema>;
