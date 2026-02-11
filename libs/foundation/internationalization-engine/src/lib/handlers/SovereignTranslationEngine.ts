/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTranslationEngine
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance & Neural Consistency
 * @description Motor de elite para resolução semântica e auditoria de Aura.
 * CURA TS2459: Exportação explícita de ISovereignDictionary para malha de handlers.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import {
  type Locale,
  type ISovereignDictionary,
  LocaleSchema,
  SovereignDictionarySchema
} from '../schemas/Internationalization.schema.js';

/** 
 * @section RE-EXPORTAÇÃO DE SOBERANIA 
 * CURA TS2459: Permite que aparatos irmãos (TransmuteGeopoliticalId) 
 * consumam o contrato sem redundância de importação.
 */
export type { ISovereignDictionary };

const validatedDictionariesCache = new WeakSet<ISovereignDictionary>();

/**
 * @class SovereignTranslationEngine
 * @description Orquestrador estático para processamento linguístico regionalizado.
 */
export class SovereignTranslationEngine {
  /**
   * @method translate
   * @description Resolve uma chave semântica, interpola variáveis e audita a Aura.
   * 
   * @param {ISovereignDictionary} dictionary - O silo linguístico validado.
   * @param {string} apparatusName - Nome PascalCase do aparato emissor.
   * @param {string} semanticKey - Chave de tradução exaustiva.
   * @param {Record<string, string | number>} variables - Mapa de variáveis para substituição.
   * @param {string} correlationIdentifier - Identificador inalterável da jornada forense.
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

    // 4. Auditoria de Aura (Neural Intelligence)
    const severity = translationEntry.aura?.severity;
    if (severity === 'CRITICAL' || severity === 'HIGH') {
      SovereignLogger({
        severity: 'WARN',
        apparatus: 'SovereignTranslationEngine',
        operation: 'HIGH_SEVERITY_STRING_RESOLVED',
        message: `Acesso a rastro de alta severidade: ${apparatusName}.${semanticKey}`,
        correlationIdentifier,
        metadata: { aura: translationEntry.aura }
      });
    }

    // 5. Interpolação e Selagem de Saída
    return this.interpolate(translationEntry.value, variables, correlationIdentifier);
  }

  /**
   * @method ensureDictionaryIntegrity
   * @private
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
          version: '4.0.0',
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
   * @description Realiza a substituição segura e higienizada de placeholders.
   */
  private static interpolate(
    template: string,
    variables: Record<string, string | number>,
    correlationIdentifier: string
  ): string {
    return template.replace(/{(\w+)}/g, (match, variableName) => {
      const value = variables[variableName];

      if (value === undefined) {
        this.reportSemanticEntropy('INTERPOLATION_MISSING_VARIABLE', 'Engine', variableName, 'N/A', correlationIdentifier);
        return match;
      }

      // Sanitização Soberana anti-XSS
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

  /**
   * @method reportSemanticEntropy
   * @private
   */
  private static reportSemanticEntropy(
    entropyType: string,
    apparatus: string,
    key: string,
    locale: string,
    correlationIdentifier: string
  ): void {
    SovereignLogger({
      severity: 'ERROR',
      apparatus: 'SovereignTranslationEngine',
      operation: 'SEMANTIC_ENTROPY_DETECTED',
      message: `Dívida Semântica [${entropyType}]: ${apparatus}.${key} no território ${locale}.`,
      correlationIdentifier,
      metadata: { apparatus, key, locale }
    });
  }
}