/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveMasterPrompt
 * @description Resolve a diretiva de IA baseada na taxonomia do erro detectado.
 * @policy ZERO-ABBREVIATIONS: Clareza absoluta.
 */

import { IMasterPrompt } from '../schemas/NeuralPromptRegistry.schema.js';
import { ISovereignError } from '@agentevai/sovereign-error-observability';

/**
 * @name ResolveMasterPrompt
 * @function
 * @description Busca o prompt ideal. No futuro, este aparato consultará o Cache do Redis
 * sincronizado com a UI do Admin.
 */
export const ResolveMasterPrompt = (
  errorPacket: ISovereignError,
  customRegistry?: IMasterPrompt[]
): string => {
  // Simulação de busca dinâmica - No estado PERFECT, viria do DataVault/Redis
  const fallbackDirective = `
    Aja como um {persona}.
    Analise a falha estrutural: {error}.
    Verifique o rastro forense: {stack}.
    Determine se o aparato {apparatus} requer AUTO-REPAIR ou HUMAN_INTERVENTION.
  `;

  let persona: string = 'ARCHITECT_ELITE';

  if (errorPacket.uniqueErrorCode.includes('SEC')) persona = 'SECURITY_SENTINEL';
  if (errorPacket.uniqueErrorCode.includes('APP')) persona = 'FORENSIC_EXAMINER';

  return fallbackDirective
    .replace('{persona}', persona)
    .replace('{error}', errorPacket.i18nMappingKey)
    .replace('{stack}', errorPacket.forensicTrace.stack)
    .replace('{apparatus}', errorPacket.apparatusMetadata.name);
};
