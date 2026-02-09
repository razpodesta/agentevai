/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PopularSupportTriggerSchema
 * @version 1.0.0
 */

import { z } from 'zod';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';

export const SupportStatusSchema = z.enum([
  'IDLE',         // Aguardando intenção
  'SIGNING',      // Processando assinatura eletrônica
  'SEALED',       // Selado no Pool Regional
  'UNAUTHORIZED'  // Cidadão não logado ou IAL insuficiente
]).brand<'SupportStatus'>();

export type SupportStatus = z.infer<typeof SupportStatusSchema>;

export const PopularSupportTriggerInputSchema = z.object({
  status: SupportStatusSchema.default('IDLE' as SupportStatus),
  
  assuranceLevel: IdentityAssuranceLevelSchema,

  currentSupportCount: z.number().int().nonnegative(),

  /** Chave do fragmento i18n injetado */
  dictionary: z.record(z.string(), z.unknown()),

  onSignIntent: z.function({
    input: z.tuple([]),
    output: z.promise(z.void())
  }).describe('Gatilho para ignição da assinatura via Vault.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type IPopularSupportTriggerInput = z.infer<typeof PopularSupportTriggerInputSchema>;