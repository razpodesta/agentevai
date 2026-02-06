/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignEngagementTriggerSchema
 * Rota Relativa: libs/foundation/ui-kit-atoms/src/lib/sovereign-engagement-trigger/schemas/SovereignEngagementTrigger.schema.ts
 */

import { z } from 'zod';

export const SovereignEngagementTriggerSchema = z.object({
  label: z.string()
    .min(3)
    .describe('Texto descritivo da ação pública a ser executada'),
    
  hierarchy: z.enum(['PRIMARY', 'SECONDARY', 'GHOST', 'CRITICAL'])
    .describe('Nível de importância visual seguindo o manifesto de branding'),
    
  status: z.enum(['IDLE', 'LOADING', 'SUCCESS', 'DISABLED'])
    .default('IDLE')
    .describe('Estado operativo atual do gatilho de engajamento'),
    
  onExecute: z.function()
    .args()
    .returns(z.void())
    .describe('Callback de alta prioridade para processamento da intenção do cidadão'),
}).readonly();

export type ISovereignEngagementTrigger = z.infer<typeof SovereignEngagementTriggerSchema>;