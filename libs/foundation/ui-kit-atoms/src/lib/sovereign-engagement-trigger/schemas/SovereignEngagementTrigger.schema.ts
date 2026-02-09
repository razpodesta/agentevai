/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignEngagementTriggerSchema
 * @version 1.2.3
 * @protocol OEDP-V5.5 - High Precision & Neural Integrity
 * @description Definição de ADN para gatilhos de engajamento.
 * Estabelece o contrato de propriedades, estados operativos e callbacks de intenção.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy CONSTRUCTION-BY-OBJECT: Uso de sobrecarga estrita para compatibilidade Zod V4.
 */

import { z } from 'zod';

/**
 * @name SovereignEngagementTriggerSchema
 * @description Aduana de ADN para validação de propriedades de gatilhos de ação cidadã.
 */
export const SovereignEngagementTriggerSchema = z.object({
  /** Texto que comunica a intenção da ação ao cidadão */
  label: z.string()
    .min(3, { message: 'LABEL_TOO_SHORT' })
    .describe('Rótulo textual legível que descreve a ação pública a ser disparada.'),

  /** Nível de destaque visual conforme a hierarquia de Soberania Estética */
  hierarchy: z.enum(['PRIMARY', 'SECONDARY', 'GHOST', 'CRITICAL'])
    .describe('Classificação de importância visual do aparato seguindo o Manifesto 0008.'),

  /** Estado de vida operativo do componente em runtime */
  status: z.enum(['IDLE', 'LOADING', 'SUCCESS', 'DISABLED'])
    .default('IDLE')
    .describe('Reflete o ciclo de vida da intenção: repouso, processamento, sucesso ou bloqueio.'),

  /**
   * @section CORREÇÃO TS2769 & TS2339
   * @description Implementação da Sobrecarga de Objeto.
   * Para satisfazer o compilador na versão 4.3.6, definimos entrada e saída simultaneamente.
   */
  onExecute: z.function({
    input: z.tuple([]),
    output: z.void()
  }).describe('Callback de alta prioridade invocado após validação de Soberania.'),

}).readonly();

/**
 * @interface ISovereignEngagementTrigger
 * @description Interface extraída do ADN para tipagem de propriedades em componentes React.
 */
export type ISovereignEngagementTrigger = z.infer<typeof SovereignEngagementTriggerSchema>;
