/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticAuraPulse.schema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para a partícula visual de reputação. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name KineticAuraPulseBaseSchema
 * @description Estrutura bruta dos dados antes da selagem nominal.
 */
export const KineticAuraPulseBaseSchema = z.object({
  standingPoints: ReputationScoreSchema
    .describe('O mérito social do cidadão que dita a frequência cromática da aura.'),

  isSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de colapso de reputação (Restrição técnica).'),

  /** Silo linguístico tipado para o aparato */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Fragmento de dicionário validado para labels de acessibilidade.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para rastro de telemetria.')
});

/**
 * @name KineticAuraPulseSchema
 * @section Selagem Nominal Zenith
 * CURA: Alinhamento nominal para exportação consistente.
 */
export const KineticAuraPulseSchema = KineticAuraPulseBaseSchema
  .brand<'KineticAuraPulse'>()
  .readonly();

export type IKineticAuraPulse = z.infer<typeof KineticAuraPulseSchema>;