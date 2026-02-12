/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslatePostalCodeToMunicipalitySchema
 * @version 2.0.1
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description ADN de orquestração para resolução territorial via rastro postal.
 */

import { z } from 'zod';
import { IbgeCodeSchema, BrazilianStateCodeSchema } from './GeographicRegion.schema.js';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

/**
 * @name TranslatePostalCodeResultBaseSchema
 * @description Estrutura pura para evitar colapsos de indexação em transmutações.
 */
export const TranslatePostalCodeResultBaseSchema = z.object({
  identifier: IbgeCodeSchema
    .describe('Código IBGE transmutado em número Branded para integridade geográfica.'),
    
  name: z.string()
    .min(2)
    .describe('Nome canônico do município identificado.'),
    
  stateCode: BrazilianStateCodeSchema
    .describe('Sigla da Unidade Federativa carimbada com marca nominal.'),
    
  slug: RegionSlugSchema
    .describe('Slug de ruteamento gerado automaticamente para o Jornal Local.'),
});

/**
 * @name TranslatePostalCodeResultSchema
 * @description Contrato SELADO e NOMINAL para trânsito no Reino Geográfico.
 */
export const TranslatePostalCodeResultSchema = TranslatePostalCodeResultBaseSchema
  .brand<'TranslatePostalCodeResult'>()
  .readonly();

export type ITranslatePostalCodeResult = z.infer<typeof TranslatePostalCodeResultSchema>;