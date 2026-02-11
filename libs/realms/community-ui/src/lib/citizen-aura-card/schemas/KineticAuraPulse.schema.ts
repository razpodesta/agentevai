/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticAuraPulseSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de elite para a partícula visual de reputação. 
 * Implementa a técnica de Selagem Tardia para erradicar o erro TS2741.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name KineticAuraPulseBaseSchema
 * @description Estrutura bruta dos dados antes da selagem nominal.
 * Permite que o componente pai realize a composição sem violar a marca.
 */
export const KineticAuraPulseBaseSchema = z.object({
  standingPoints: ReputationScoreSchema
    .describe('O mérito social do cidadão que dita a frequência cromática da aura.'),

  isSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de colapso de reputação (Restrição técnica).'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para labels de acessibilidade neural.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para rastro de telemetria.')
});

/**
 * @name KineticAuraPulseInputSchema
 * @description O contrato SELADO e IMUTÁVEL carimbado com marca nominal.
 */
export const KineticAuraPulseInputSchema = KineticAuraPulseBaseSchema
  .brand<'KineticAuraPulseInput'>()
  .readonly();

export type IKineticAuraPulseInput = z.infer<typeof KineticAuraPulseInputSchema>;