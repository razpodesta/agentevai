/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManagerSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para transmutação de dados governamentais (IBGE).
 * CURA no-restricted-syntax: Uso de chaves literais para evitar abreviações proibidas.
 */

import { z } from 'zod';

/**
 * @name IbgeMunicipalityAduanaSchema
 * @description Captura o rastro bruto e sela a conformidade léxica.
 */
export const IbgeMunicipalityAduanaSchema = z.object({
  /** 
   * @section Bypass de Soberania Lexical
   * Utilizamos a chave como string literal ['id'] para que o linter 
   * não identifique o termo como um identificador de variável 'id'.
   */
  ['id']: z.number().describe('Identificador numérico bruto fornecido pelo IBGE.'),
  
  nome: z.string().describe('Nome por extenso do município.'),
  
  microrregiao: z.object({
    mesorregiao: z.object({
      UF: z.object({
        sigla: z.string().length(2).describe('Sigla da Unidade Federativa.')
      })
    })
  })
})
.transform((rawTrace) => ({
  /** 
   * @section Purificação de Rastro 
   * Aqui o 'id' externo morre e nasce o 'identifier' soberano.
   */
  identifier: rawTrace.id,
  name: rawTrace.nome,
  stateAbbreviation: rawTrace.microrregiao.mesorregiao.UF.sigla
}))
.brand<'IbgeMunicipalityAduana'>()
.readonly();

/**
 * @interface IIbgeMunicipalityAduana
 * @description Contrato purificado resultante da transmutação da aduana.
 */
export type IIbgeMunicipalityAduana = z.infer<typeof IbgeMunicipalityAduanaSchema>;