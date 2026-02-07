/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTranslationEngine
 * @version 2.5.0
 * @description Motor de elite para processamento linguístico e resolução semântica.
 * Realiza a validação de integridade estrutural do dicionário e interpolação segura.
 * @protocol OEDP-V5.5 - High Performance & Full Resilience.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  Locale,
  ISovereignDictionary,
  LocaleSchema,
  SovereignDictionarySchema
} from '../schemas/Internationalization.schema';

/**
 * @class SovereignTranslationEngine
 * @description Handler estático para operações de alta performance em strings soberanas.
 * Implementa blindagem contra dicionários corrompidos e falhas de rastro forense.
 */
export class SovereignTranslationEngine {
  /**
   * @method translate
   * @description Resolve uma chave semântica, valida a estrutura do dicionário e registra telemetria.
   *
   * @param {ISovereignDictionary} dictionary - O dicionário consolidado (SSOT).
   * @param {string} apparatusName - Nome PascalCase do aparato solicitante.
   * @param {string} semanticKey - Chave da tradução desejada.
   * @param {Record<string, string | number>} variables - Variáveis para substituição.
   * @param {string} correlationIdentifier - Identificador de rastro forense.
   * @returns {string} Texto final processado ou indicador de erro semântico.
   */
  public static translate(
    dictionary: ISovereignDictionary,
    apparatusName: string,
    semanticKey: string,
    variables: Record<string, string | number> = {},
    correlationIdentifier: string
  ): string {
    // 1. Validação de Integridade do Dicionário (Zod 1000% Mastery)
    const integrityCheck = SovereignDictionarySchema.safeParse(dictionary);

    if (!integrityCheck.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-INTL-4001'),
        i18nMappingKey: 'DICTIONARY_STRUCTURE_CORRUPTED',
        severity: 'CRITICAL',
        apparatusMetadata: {
          name: 'SovereignTranslationEngine',
          version: '2.5.0',
          fileLocation: 'libs/foundation/internationalization-engine/src/lib/handlers/SovereignTranslationEngine.ts'
        },
        runtimeSnapshot: {
          /** @section CORREÇÃO TS2353: Encapsulamento correto no inputPayload */
          inputPayload: { apparatusName, semanticKey, providedDictionary: !!dictionary },
          correlationIdentifier,
          validationIssues: integrityCheck.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ST_UNAVAILABLE'
        },
        recoverySuggestion: 'O dicionário falhou na validação de ADN. Verifique o integrityHash e o compilador de i18n.'
      });
    }

    // 2. Resolução do Fragmento (Lookup Seguro)
    const fragment = dictionary.content[apparatusName]?.[semanticKey];

    // 3. Tratamento de Entropia Semântica
    if (!fragment) {
      this.reportSemanticEntropy(apparatusName, semanticKey, dictionary.metadata.locale, correlationIdentifier);
      return `[UNDEFINED:${apparatusName}.${semanticKey}]`;
    }

    // 4. Interpolação de Elite
    return this.interpolate(fragment.value, variables, correlationIdentifier);
  }

  /**
   * @method interpolate
   * @private
   * @description Realiza a substituição de placeholders {var} com higienização anti-XSS.
   */
  private static interpolate(
    template: string,
    variables: Record<string, string | number>,
    correlationIdentifier: string
  ): string {
    return template.replace(/{(\w+)}/g, (match, variableName) => {
      const value = variables[variableName];

      if (value === undefined) {
        SovereignLogger({
          severity: 'WARN',
          apparatus: 'SovereignTranslationEngine',
          operation: 'INTERPOLATION_MISSING_VAR',
          message: `Placehoder {${variableName}} não fornecido para interpolação.`,
          traceIdentifier: correlationIdentifier,
        });
        return match;
      }

      // Higienização para evitar injeção de caracteres de controle na UI.
      return String(value).replace(/[<>]/g, '');
    });
  }

  /**
   * @method resolveLocale
   * @description Normaliza e valida a localização desejada contra o ADN Soberano.
   */
  public static resolveLocale(requestedLocale: string): Locale {
    const result = LocaleSchema.safeParse(requestedLocale);
    if (result.success) return result.data;

    // Fallback Soberano para o território brasileiro.
    return LocaleSchema.parse('pt-BR');
  }

  /**
   * @method reportSemanticEntropy
   * @private
   * @description Notifica o AI-Neural-Auditor sobre falhas na malha linguística.
   */
  private static reportSemanticEntropy(
    apparatus: string,
    key: string,
    locale: string,
    correlationIdentifier: string
  ): void {
    SovereignLogger({
      severity: 'ERROR',
      apparatus: 'SovereignTranslationEngine',
      operation: 'SEMANTIC_ENTROPY_DETECTED',
      message: `Dívida Semântica: ${apparatus}.${key} ausente no locale ${locale}.`,
      traceIdentifier: correlationIdentifier,
      metadata: { apparatus, key, locale }
    });
  }
}
