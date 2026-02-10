/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveMasterPrompt
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance Semantics
 * @description Orquestrador de diretivas neurais regionalizadas.
 * Erradicada radiação técnica de any e variáveis órfãs.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Local */
import {
  ResolveMasterPromptInputSchema,
  type IResolveMasterPromptInput
} from './schemas/ResolveMasterPrompt.schema.js';

export interface IResolvedPromptResult {
  readonly resolvedDirective: string;
  readonly selectedPersona: string;
}

/**
 * @name ResolveMasterPrompt
 * @function
 * @description Transmuta um pacote de erro em uma instrução técnica poliglota para o Oráculo.
 */
export const ResolveMasterPrompt = (
  rawParameters: unknown,
  dictionary: ISovereignDictionary
): IResolvedPromptResult => {
  const apparatusName = 'ResolveMasterPrompt';
  const fileLocation = 'libs/orchestration/ai-neural-auditor/src/lib/handlers/ResolveMasterPrompt.ts';

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Desestruturação Exaustiva)
    const validatedData = ResolveMasterPromptInputSchema.parse(rawParameters);
    const { errorPacket, customRegistry, correlationIdentifier } = validatedData;

    // 2. DETERMINAÇÃO DE PERSONA (Cura TS7053 via Mapeamento Nominal)
    const errorCode = errorPacket.uniqueErrorCode;
    let personaKey = 'persona_ARCHITECT';

    if (errorCode.includes('SEC')) personaKey = 'persona_SECURITY';
    else if (errorCode.includes('APP') || errorCode.includes('VAL')) personaKey = 'persona_FORENSIC';

    // 3. RESOLUÇÃO DE DIRETIVA (Hierarquia: Custom Registry > Static Dictionary)
    let baseTemplate: string;
    let selectedPersona: string;

    const customPrompt = customRegistry?.find(prompt => prompt.persona === personaKey);

    if (customPrompt) {
      baseTemplate = customPrompt.directiveTemplate;
      selectedPersona = customPrompt.persona;
    } else {
      // Pilar 5: Soberania Linguística
      const t = (key: string) => SovereignTranslationEngine.translate(
        dictionary, apparatusName, key, {}, correlationIdentifier
      );
      baseTemplate = t('baseTemplate');
      selectedPersona = t(personaKey);
    }

    // 4. COMPOSIÇÃO DA DIRETIVA (Neural Frame Assembly)
    const resolvedDirective = baseTemplate
      .replace('{persona}', selectedPersona)
      .replace('{error}', errorPacket.i18nMappingKey)
      .replace('{stack}', errorPacket.forensicTrace.stack)
      .replace('{apparatus}', errorPacket.apparatusMetadata.name);

    // 5. TELEMETRIA SOBERANA
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'PROMPT_RESOLVED',
      message: `Diretiva neural selada para o aparato ${errorPacket.apparatusMetadata.name}.`,
      correlationIdentifier
    });

    return { resolvedDirective, selectedPersona };

  } catch (caughtError) {
    /**
     * @section Saneamento de rastro
     * Erradicado o 'any'. Utilizamos type guards para extrair o identificador.
     */
    const fallbackCorrelationId = (rawParameters as IResolveMasterPromptInput)?.correlationIdentifier || 'NO_TRACE';

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-AUD-4001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: fallbackCorrelationId,
      severity: 'CRITICAL'
    });
  }
};
