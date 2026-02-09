/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NeuralProviderSelector
 * @description Decide qual cluster de IA convocar baseado na taxonomia do erro.
 */

import { type ISovereignError } from '@agentevai/sovereign-error-observability';
import { AuditorPersonaSchema } from '../schemas/NeuralPromptRegistry.schema.js';
import { z } from 'zod';

export interface INeuralRoute {
  readonly provider: 'GOOGLE_GEMINI' | 'ANTHROPIC_CLAUDE' | 'OPENAI_GPT';
  readonly model: string;
  readonly persona: z.infer<typeof AuditorPersonaSchema>;
}

/**
 * @name NeuralProviderSelector
 * @function
 * @description Orquestra a diplomacia neural para otimizar custo e precisão.
 */
export const NeuralProviderSelector = (errorPacket: ISovereignError): INeuralRoute => {
  const errorCode = errorPacket.uniqueErrorCode;

  // Erros de Segurança -> Foco em Políticas (GPT-4o)
  if (errorCode.includes('SEC')) {
    return { provider: 'OPENAI_GPT', model: 'gpt-4o', persona: 'SECURITY_SENTINEL' };
  }

  // Erros de Infraestrutura/Core -> Foco em rastro forense (Claude 3.5)
  if (errorCode.includes('CORE') || errorCode.includes('INT')) {
    return { provider: 'ANTHROPIC_CLAUDE', model: 'claude-3-5-sonnet-latest', persona: 'FORENSIC_EXAMINER' };
  }

  // Fallback para Diagnóstico de Negócio (Gemini 2.0 Thinking)
  return { provider: 'GOOGLE_GEMINI', model: 'gemini-2.0-flash-thinking', persona: 'ARCHITECT_ELITE' };
};
