/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManagerSchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para transmutação de dados governamentais (IBGE).
 */

import { z } from 'zod';

/**
 * @name IbgeMunicipalityAduanaSchema
 * @description Captura o rastro bruto da API do IBGE e sela a conformidade léxica.
 */
export const IbgeMunicipalityAduanaSchema = z.object({
  /** 
   * A API do IBGE retorna 'id', mas a nossa aduana transmuta 
   * instantaneamente para 'identifier'. 
   */
  id: z.number().describe('Identificador numérico bruto fornecido pelo IBGE.'),
  
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
  identifier: rawTrace.id,
  name: rawTrace.nome,
  stateAbbreviation: rawTrace.microrregiao.mesorregiao.UF.sigla
}))
.brand<'IbgeMunicipalityAduana'>()
.readonly();

export type IIbgeMunicipalityAduana = z.infer<typeof IbgeMunicipalityAduanaSchema>;