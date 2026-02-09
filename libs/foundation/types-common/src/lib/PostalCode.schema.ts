/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PostalCodeSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5 - High Precision
 * @description ADN para validação e representação de rastro postal brasileiro.
 * Nivelado para status PERFECT: Erradica o sangramento de tipos entre string/number.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */

/** Identificador de CEP: 8 dígitos puros. */
export const PostalCodeSchema = z.string()
  .regex(/^\d{8}$/, { message: 'POSTAL_CODE_INVALID_FORMAT' })
  .describe('Código de Endereçamento Postal brasileiro (apenas números).')
  .brand<'PostalCode'>();

export type PostalCode = z.infer<typeof PostalCodeSchema>;

/**
 * Identificador IBGE: Transmutado para number na base.
 * Resolve o conflito com GeographicRegionSchema.
 */
export const PostalIbgeCodeSchema = z.number()
  .int()
  .positive()
  .describe('Código identificador municipal do IBGE.')
  .brand<'IbgeCode'>();

/**
 * @name PostalLocationSchema
 * @description Contrato de saída soberano para localização via CEP.
 */
export const PostalLocationSchema = z.object({
  postalCode: PostalCodeSchema,

  street: z.string()
    .min(1)
    .describe('Logradouro ou nome da via identificado.'),

  neighborhood: z.string()
    .min(1)
    .describe('Bairro ou distrito.'),

  city: z.string()
    .min(2)
    .describe('Nome do município correspondente.'),

  /** Alinhamento Manifesto 0018: de Abbreviation para stateCode */
  stateCode: z.string()
    .length(2)
    .toUpperCase()
    .describe('Sigla da Unidade Federativa (UF).'),

  ibgeCode: PostalIbgeCodeSchema
    .describe('Código oficial do IBGE para ruteamento geográfico.'),

  coordinates: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }).optional().describe('Coordenadas geográficas decimais para precisão de mapa.'),

}).readonly();

export type IPostalLocation = z.infer<typeof PostalLocationSchema>;
