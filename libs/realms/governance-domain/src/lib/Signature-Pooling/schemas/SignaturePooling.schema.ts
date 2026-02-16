/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SignaturePoolingSchema
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite que governa a ingestão e o estado dos lotes regionais.
 * CURADO: Unificação de rastro de Entrada e Registro de Estado (SSOT).
 */

import { z } from 'zod';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS --- */

export const WeightedImpactSchema = z.number()
  .min(1)
  .describe('Peso matemático da vontade cidadã baseado no rastro NIST.')
  .brand<'WeightedImpact'>();

export type WeightedImpact = z.infer<typeof WeightedImpactSchema>;

export const PoolStatusSchema = z.enum([
  'OPEN', 'SEALING', 'ANCHORED', 'CORRUPTED'
]).brand<'PoolStatus'>();

export type PoolStatus = z.infer<typeof PoolStatusSchema>;

/* --- 📥 SEÇÃO 2: ADUANA DE ENTRADA (INPUT) --- */

export const SignatureIngestionInputSchema = z.object({
  citizenIdentifier: z.uuid(),
  targetContentIdentifier: z.uuid(),
  assuranceLevel: IdentityAssuranceLevelSchema,
  regionalSlug: z.string().min(2),
  correlationIdentifier: z.uuid()
})
.brand<'SignatureIngestionInput'>()
.readonly();

export type ISignatureIngestionInput = z.infer<typeof SignatureIngestionInputSchema>;

/* --- 🏛️ SEÇÃO 3: REGISTRO DE ESTADO (POOL STATE) --- */

export const SignatureRegistryPoolSchema = z.object({
  poolIdentifier: z.uuid(),
  regionalSlug: z.string().min(2),
  currentStatus: PoolStatusSchema.default('OPEN' as PoolStatus),
  merkleRootAnchor: z.string().length(64).optional(),
  totalWeightInGroup: z.number().nonnegative().default(0),
  openedAt: z.string().datetime(),
  closedAt: z.string().datetime().optional(),
  correlationIdentifier: z.uuid()
})
.brand<'SignatureRegistryPool'>()
.readonly();

export type ISignatureRegistryPool = z.infer<typeof SignatureRegistryPoolSchema>;