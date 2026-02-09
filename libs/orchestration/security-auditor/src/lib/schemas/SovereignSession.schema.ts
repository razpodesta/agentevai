/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSessionSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5
 */

import { z } from 'zod';
import { EncryptedDataSchema } from '@agentevai/sovereign-data-vault';

export const SovereignSessionSchema = z.object({
  isAuthenticated: z.boolean(),
  hasStoredConsciousness: z.boolean(),

  vaultedData: EncryptedDataSchema.optional(),

  /**
   * @section CORREÇÃO_ZOD_2026
   * Substituído z.string().uuid() por z.uuid() para performance de elite.
   */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense.')
}).readonly();

export type ISovereignSession = z.infer<typeof SovereignSessionSchema>;
