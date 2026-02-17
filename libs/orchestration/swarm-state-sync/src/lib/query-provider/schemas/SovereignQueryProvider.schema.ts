/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQueryProviderSchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Master DNA Zenith
 * @description ADN que governa a configuração física do búnquer de cache local.
 * CURADO: Sincronizado para Zod V4 e selagem nominal.
 */

import { z } from 'zod';

export const QueryCacheConfigurationSchema = z.object({
  staleTimeInMilliseconds: z.number()
    .default(1000 * 60 * 5)
    .describe('Tempo de vida do rastro antes da reinvalidação neural.'),

  garbageCollectionTimeInMilliseconds: z.number()
    .default(1000 * 60 * 60 * 24)
    .describe('Tempo de permanência do rastro no búnquer local.'),

  persistenceKeyIdentifier: z.string()
    .default('agv_swarm_cache_seal')
    .describe('Chave inalterável para selagem no LocalStorage.'),

  retryAttemptsCount: z.number().int().min(0).max(5).default(3)
})
.brand<'SovereignQueryProvider'>()
.readonly();

export type IQueryCacheConfiguration = z.infer<typeof QueryCacheConfigurationSchema>;
