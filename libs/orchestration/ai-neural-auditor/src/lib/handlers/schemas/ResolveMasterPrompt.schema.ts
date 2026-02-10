/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveMasterPromptSchema
 * @version 1.2.0
 * @protocol OEDP-V6.0 - High Precision DNA
 */

import { z } from 'zod';
import { MasterPromptSchema } from '../../schemas/NeuralPromptRegistry.schema.js';
import { SovereignErrorSchema } from '@agentevai/sovereign-error-observability';

/**
 * @name ResolveMasterPromptInputSchema
 * @description Aduana de entrada estrita para o orquestrador de diretivas.
 */
export const ResolveMasterPromptInputSchema = z.object({
  /**
   * @section Sincronia de Borda
   * Validamos o pacote de erro contra o ADN mestre de observabilidade.
   */
  errorPacket: SovereignErrorSchema,

  /** Lista de diretivas customizadas injetadas via infraestrutura. */
  customRegistry: z.array(MasterPromptSchema).optional(),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'ResolveMasterPromptInput'>()
.readonly();

export type IResolveMasterPromptInput = z.infer<typeof ResolveMasterPromptInputSchema>;
