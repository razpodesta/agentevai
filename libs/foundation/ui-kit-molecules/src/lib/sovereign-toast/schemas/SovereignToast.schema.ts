/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignToastSchema
 * @version 1.0.0
 * @description ADN para a molécula de feedback sistêmico.
 * Integra a taxonomia de erros com a semântica visual do Manifesto 0008.
 */

import { z } from 'zod';

export const SovereignToastSchema = z.object({
  /** Identificador único do pulso de erro */
  identifier: z.string().uuid(),

  /** Nível de urgência visual */
  severity: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR', 'CRITICAL']),

  /** Título semântico (geralmente vindo do i18nMappingKey do SovereignError) */
  title: z.string().min(3),

  /** Descrição detalhada ou mensagem de erro humanizada */
  message: z.string().min(5),

  /** Sugestão de ação para o usuário (ex: "Tente novamente") */
  recoveryActionLabel: z.string().optional(),

  /** Metadados de rastro (ex: Correlation ID) para exibição técnica opcional */
  traceIdentifier: z.string().optional()
}).readonly();

export type ISovereignToast = z.infer<typeof SovereignToastSchema>;
