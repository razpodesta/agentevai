/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PulseIndicatorSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Kinetic Visual ADN
 * @description ADN que define o comportamento da partícula visual de pulso.
 * Implementa a sincronia de rastro forense para auditoria de interface.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar inalterável.
 */

import { z } from 'zod';

/**
 * @name PulseIndicatorInputSchema
 * @description Aduana para a partícula cinética.
 * Sincronizado para garantir que a telemetria de interface seja ininterrupta.
 */
export const PulseIndicatorInputSchema = z.object({
  isCritical: z.boolean()
    .default(false)
    .describe('Sinalizador de criticidade: Transmuta o pulso cromático para o semáforo de alerta.'),

  /**
   * @section Sincronia de Rastro
   * Obrigatório para que o átomo possa reportar sua impressão visual.
   */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.'),

  /**
   * @section Soberania Linguística
   * Silo para rótulos de acessibilidade neural.
   */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Fragmento de dicionário para estados de acessibilidade.'),

}).readonly();

export type IPulseIndicator = z.infer<typeof PulseIndicatorInputSchema>;
