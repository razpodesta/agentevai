/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplay.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para exibição de mérito social. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name CitizenStandingDisplayBaseSchema
 * @description Estrutura fundamental permitindo transformações de Reino.
 */
export const CitizenStandingDisplayBaseSchema = z.object({
  citizenName: z.string()
    .min(2)
    .max(50)
    .describe('Identificador nominal do cidadão para exibição editorial.'),

  humanizedRole: z.string()
    .min(3)
    .describe('Papel funcional traduzido pela matriz de autoridade.'),

  reputationScore: ReputationScoreSchema
    .describe('O standing social carimbado com marca nominal.'),

  isSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de restrição operativa ativa.'),

  /** 
   * @section CURA_ANY 
   * Silo linguístico tipado para o aparato.
   */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Fragmento de dicionário validado.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name CitizenStandingDisplayInputSchema
 * @section Selagem Nominal Zenith
 */
export const CitizenStandingDisplayInputSchema = CitizenStandingDisplayBaseSchema
  .brand<'CitizenStandingDisplayInput'>()
  .readonly();

export type ICitizenStandingDisplayInput = z.infer<typeof CitizenStandingDisplayInputSchema>;