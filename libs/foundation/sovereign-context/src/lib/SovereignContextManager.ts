/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignContextManager
 * Descrição: Fábrica atômica responsável pela criação e validação do contexto de execução.
 * Rota Relativa: libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts
 */

import { SovereignContextSchema, ISovereignContext } from './schemas/SovereignContext.schema';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/**
 * @name CreateSovereignContext
 * @function
 * @description Instancia uma nova consciência de contexto validada pelo ADN estrutural.
 */
export const CreateSovereignContext = (
  initialInformation: unknown
): ISovereignContext => {
  const apparatusName = 'SovereignContextManager';

  // 1. Validação de Integridade (Zero-Any Policy)
  const validationResult = SovereignContextSchema.safeParse(initialInformation);

  if (!validationResult.success) {
    SovereignLogger({
      severity: 'CRITICAL',
      apparatus: apparatusName,
      operation: 'INITIALIZE_CONTEXT',
      message: 'Falha fatal: O ADN de contexto fornecido é incompatível com a realidade do sistema.',
      metadata: { validationErrors: validationResult.error.format() }
    });
    throw new Error('SYSTEM_CONSCIOUSNESS_COLAPSE');
  }

  // 2. Registro forense do nascimento do contexto
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'CONTEXT_READY',
    message: `Consciência estabelecida para a região: ${validationResult.data.geography.regionName}`,
    metadata: { 
      locale: validationResult.data.language.activeLocale,
      health: validationResult.data.systemStatus.healthScore 
    }
  });

  return validationResult.data;
};