/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQueryProviderSchema
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN que governa a configuração física do búnquer de cache local.
 */

import { z } from 'zod';

/** 
 * @name QueryCacheConfigurationSchema 
 */
export const QueryCacheConfigurationSchema = z.object({
  staleTimeInMilliseconds: z.number()
    .default(1000 * 60 * 5)
    .describe('Tempo de vida do rastro antes da reinvalidação neural.'),

  garbageCollectionTimeInMilliseconds: z.number()
    .default(1000 * 60 * 60 * 24)
    .describe('Tempo de permanência do rastro no búnquer local.'),

  persistenceKey: z.string()
    .default('agv_sovereign_cache_seal'),

  retryAttemptsCount: z.number().int().min(0).max(5).default(3)
}).readonly();

export type IQueryCacheConfiguration = z.infer<typeof QueryCacheConfigurationSchema>;