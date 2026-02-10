/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PopularSupportTriggerSchema
 * @version 1.2.0
 * @protocol OEDP-V5.5.2 - Public Trust Integrity
 * @description ADN que define o estado e o comportamento do gatilho de apoio popular.
 * Saneado contra erro TS2769 via marcação nominal de valor padrão.
 */

import { z } from 'zod';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';

/**
 * @section Dimensão de Estado Operativo
 */
const SupportStatusEnum = z.enum([
  'IDLE',
  'SIGNING',
  'SEALED',
  'UNAUTHORIZED'
]);

export const SupportStatusSchema = SupportStatusEnum
  .describe('Reflete o estágio atual da assinatura eletrônica no rastro de soberania.')
  .brand<'SupportStatus'>();

export type SupportStatus = z.infer<typeof SupportStatusSchema>;

/**
 * @name PopularSupportTriggerInputBaseSchema
 * @description Estrutura base para permitir a aplicação de defaults em tipos nominais.
 */
export const PopularSupportTriggerInputBaseSchema = z.object({
  /** 
   * @section Sincronia Zod v4 
   * Cura do Erro TS2769: O valor padrão deve ser forçado ao tipo nominal do esquema.
   */
  status: SupportStatusSchema
    .default('IDLE' as SupportStatus),
  
  assuranceLevel: IdentityAssuranceLevelSchema
    .describe('Nível de fé pública (IAL) verificado da identidade ativa.'),

  currentSupportCount: z.number()
    .int()
    .nonnegative()
    .describe('Volume total de vontades cidadãs seladas no rastro regional.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para humanização de estados cinéticos.'),

  /** 
   * Sintaxe de Objeto Zod v4 para funções assíncronas.
   */
  onSignIntent: z.function({
    input: z.tuple([]),
    output: z.promise(z.void())
  }).describe('Gatilho de alta prioridade que inicia a selagem no Blockchain-Ledger.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para perícia técnica.')
});

/**
 * @name PopularSupportTriggerInputSchema
 * @section Sellado Nominal Final
 */
export const PopularSupportTriggerInputSchema = PopularSupportTriggerInputBaseSchema
  .brand<'PopularSupportTriggerInput'>()
  .readonly();

export type IPopularSupportTriggerInput = z.infer<typeof PopularSupportTriggerInputSchema>;