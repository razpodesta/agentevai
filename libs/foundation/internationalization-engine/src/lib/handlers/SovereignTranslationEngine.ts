/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTranslationEngine
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance & Neural Consistency
 * @description Motor de elite para resolução semântica.
 * CURA TS2353: Sincronização do rastro forense para correlationIdentifier.
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

const validatedDictionariesCache = new WeakSet<ISovereignDictionary>();

export class SovereignTranslationEngine {
  /**
   * @method translate
   * @description Resolve uma chave semântica e audita a Aura Semântica.
   */
  public static translate(
    dictionary: ISovereignDictionary,
    apparatusName: string,
    semanticKey: string,
    variables: Record<string, string | number> = {},
    correlationIdentifier: string
  ): string {
    this.ensureDictionaryIntegrity(dictionary, correlationIdentifier);

    const apparatusFragment = dictionary.content[apparatusName];
    if (!apparatusFragment) {
      this.reportSemanticEntropy('APPARATUS_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.locale, correlationIdentifier);
      return `[MISSING_APPARATUS:${apparatusName}]`;
    }

    const translationEntry = apparatusFragment[semanticKey];
    if (!translationEntry) {
      this.reportSemanticEntropy('KEY_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.locale, correlationIdentifier);
      return `[UNDEFINED:${apparatusName}.${semanticKey}]`;
    }

    // 4. Auditoria de Aura (Cura TS2353: correlationIdentifier)
    if (translationEntry.aura?.severity === 'CRITICAL' || translationEntry.aura?.severity === 'HIGH') {
      SovereignLogger({
        severity: 'WARN',
        apparatus: 'SovereignTranslationEngine',
        operation: 'HIGH_SEVERITY_STRING_RESOLVED',
        message: `String de alta gravidade acessada: ${apparatusName}.${semanticKey}`,
        correlationIdentifier, // CHAVE CORRIGIDA
        metadata: { aura: translationEntry.aura }
      });
    }

    return this.interpolate(translationEntry.value, variables, correlationIdentifier);
  }

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
          version: '3.0.0',
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

      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    });
  }

  public static resolveLocale(requestedLocale: string): Locale {
    const result = LocaleSchema.safeParse(requestedLocale);
    return result.success ? result.data : LocaleSchema.parse('pt-BR');
  }

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
      correlationIdentifier, // CHAVE CORRIGIDA
      metadata: { apparatus, key, locale }
    });
  }
}
