/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQuery.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Synchronization DNA
 * @description ADN mestre para orquestração de estados assíncronos e mutações.
 */

import { z } from 'zod';

/** @section Dimensões Nominais (Branded Types) */
export const MutationIdentifierSchema = z.string()
  .min(5)
  .describe('Identificador único da intenção de mudança de estado.')
  .brand<'MutationIdentifier'>();

export type MutationIdentifier = z.infer<typeof MutationIdentifierSchema>;

/** @name QueryCacheConfigurationSchema */
export const QueryCacheConfigurationSchema = z.object({
  staleTimeInMilliseconds: z.number()
    .default(1000 * 60 * 5)
    .describe('Tempo de vida da informação antes da invalidação.'),

  garbageCollectionTimeInMilliseconds: z.number()
    .default(1000 * 60 * 60 * 24)
    .describe('Tempo de permanência no búnquer local (Persistence).'),

  persistenceKey: z.string()
    .default('agv_sovereign_cache_seal'),

  retryAttempts: z.number().int().min(0).max(5).default(3)
}).readonly();

/**
 * @name SovereignMutationInputSchema
 * @description Aduana para execução de mutações com suporte a Optimistic UI.
 */
export const SovereignMutationInputSchema = z.object({
  identifier: MutationIdentifierSchema,

  /**
   * @section Sincronia Zod v4
   * Definição estrutural de funções para orquestração assíncrona.
   */
  mutationExecutor: z.function({
    input: z.tuple([z.unknown()]),
    output: z.promise(z.unknown())
  }).describe('Função física que executa a transmutação no servidor/API.'),

  optimisticUpdateHandler: z.function({
    input: z.tuple([z.unknown()]),
    output: z.void()
  }).optional().describe('Atuador visual imediato antes da confirmação do rastro.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
}).readonly();

export type IQueryCacheConfiguration = z.infer<typeof QueryCacheConfigurationSchema>;
export type ISovereignMutationInput = z.infer<typeof SovereignMutationInputSchema>;
