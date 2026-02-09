/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTranslationEngine
 * @version 2.6.0
 * @protocol OEDP-V5.5 - High Performance & Neural Resonance
 * @description Motor de elite para resolução semântica e processamento linguístico.
 * Implementa cache de integridade e suporte a metadados de Aura Semântica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ESM-STRICT: Uso de extensões explícitas para compatibilidade total.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  type Locale,
  type ISovereignDictionary,
  LocaleSchema,
  SovereignDictionarySchema
} from '../schemas/Internationalization.schema.js';

/**
 * @section Cache de Integridade (Performance de Elite)
 * Armazena hashes de dicionários já validados para evitar re-parsing de ADN em cada label.
 */
const validatedDictionariesCache = new WeakSet<ISovereignDictionary>();

/**
 * @class SovereignTranslationEngine
 * @description Handler estático para orquestração de inteligência linguística.
 */
export class SovereignTranslationEngine {
  /**
   * @method translate
   * @description Resolve uma chave semântica, processa variáveis e audita a Aura Semântica.
   *
   * @param {ISovereignDictionary} dictionary - O dicionário consolidado (SSOT).
   * @param {string} apparatusName - Nome PascalCase do aparato (ex: 'SovereignRegionalHeader').
   * @param {string} semanticKey - Chave da tradução (ex: 'actionSuffix').
   * @param {Record<string, string | number>} variables - Mapa de variáveis para interpolação.
   * @param {string} correlationIdentifier - Identificador para rastro forense.
   * @returns {string} Texto final processado pronto para renderização.
   */
  public static translate(
    dictionary: ISovereignDictionary,
    apparatusName: string,
    semanticKey: string,
    variables: Record<string, string | number> = {},
    correlationIdentifier: string
  ): string {
    // 1. Validação de Integridade Otimizada
    this.ensureDictionaryIntegrity(dictionary, correlationIdentifier);

    // 2. Resolução do Fragmento de Aparato
    const apparatusFragment = dictionary.content[apparatusName];
    if (!apparatusFragment) {
      this.reportSemanticEntropy('APPARATUS_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.locale, correlationIdentifier);
      return `[MISSING_APPARATUS:${apparatusName}]`;
    }

    // 3. Resolução da Chave Semântica
    const translationEntry = apparatusFragment[semanticKey];
    if (!translationEntry) {
      this.reportSemanticEntropy('KEY_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.locale, correlationIdentifier);
      return `[UNDEFINED:${apparatusName}.${semanticKey}]`;
    }

    // 4. Auditoria de Aura (Neural Activity)
    if (translationEntry.aura?.severity === 'CRITICAL' || translationEntry.aura?.severity === 'HIGH') {
      SovereignLogger({
        severity: 'WARN',
        apparatus: 'SovereignTranslationEngine',
        operation: 'HIGH_SEVERITY_STRING_RESOLVED',
        message: `String de alta gravidade acessada: ${apparatusName}.${semanticKey}`,
        traceIdentifier: correlationIdentifier,
        metadata: { aura: translationEntry.aura }
      });
    }

    // 5. Interpolação e Higienização Cinética
    return this.interpolate(translationEntry.value, variables, correlationIdentifier);
  }

  /**
   * @method ensureDictionaryIntegrity
   * @private
   * @description Garante que o dicionário respeita o ADN estrutural sem sacrificar performance.
   */
  private static ensureDictionaryIntegrity(
    dictionary: ISovereignDictionary,
    correlationIdentifier: string
  ): void {
    if (validatedDictionariesCache.has(dictionary)) return;

    const integrityCheck = SovereignDictionarySchema.safeParse(dictionary);

    if (!integrityCheck.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-INTL-4001'),
        i18nMappingKey: 'DICTIONARY_STRUCTURE_CORRUPTED',
        severity: 'CRITICAL',
        apparatusMetadata: {
          name: 'SovereignTranslationEngine',
          version: '2.6.0',
          fileLocation: 'libs/foundation/internationalization-engine/src/lib/handlers/SovereignTranslationEngine.ts'
        },
        runtimeSnapshot: {
          inputPayload: { dictionaryVersion: dictionary?.metadata?.version },
          correlationIdentifier,
          validationIssues: integrityCheck.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ST_UNAVAILABLE'
        }
      });
    }

    validatedDictionariesCache.add(dictionary);
  }

  /**
   * @method interpolate
   * @private
   * @description Realiza a substituição segura de placeholders.
   */
  private static interpolate(
    template: string,
    variables: Record<string, string | number>,
    correlationIdentifier: string
  ): string {
    return template.replace(/{(\w+)}/g, (match, variableName) => {
      const value = variables[variableName];

      if (value === undefined) {
        this.reportSemanticEntropy('INTERPOLATION_MISSING_VAR', 'Engine', variableName, 'N/A', correlationIdentifier);
        return match;
      }

      // Higienização Soberana anti-XSS para o Bordo
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    });
  }

  /**
   * @method resolveLocale
   * @description Normaliza a identidade cultural contra o ADN validado.
   */
  public static resolveLocale(requestedLocale: string): Locale {
    const result = LocaleSchema.safeParse(requestedLocale);
    return result.success ? result.data : LocaleSchema.parse('pt-BR');
  }

  /**
   * @method reportSemanticEntropy
   * @private
   */
  private static reportSemanticEntropy(
    type: string,
    apparatus: string,
    key: string,
    locale: string,
    correlationIdentifier: string
  ): void {
    SovereignLogger({
      severity: 'ERROR',
      apparatus: 'SovereignTranslationEngine',
      operation: 'SEMANTIC_ENTROPY_DETECTED',
      message: `Dívida Semântica [${type}]: ${apparatus}.${key} no locale ${locale}.`,
      traceIdentifier: correlationIdentifier,
      metadata: { apparatus, key, locale }
    });
  }
}
