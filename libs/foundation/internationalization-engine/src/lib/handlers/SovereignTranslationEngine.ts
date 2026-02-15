/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTranslationEngine
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Zenith High Performance
 * @description Motor de resolução semântica regionalizada com auditoria de Aura.
 * CURADO: Erradicados erros de dessincronização de ADN e rastro forense.
 * @policy ZERO-ANY: Saneamento total via Tipagem Nominal (Branded).
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignApparatusRegistry, 
  ApparatusIdentifierSchema 
} from '@agentevai/apparatus-metadata-registry';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import {
  type ISovereignDictionary,

  SovereignDictionarySchema
} from '../schemas/Internationalization.schema.js';
import { 
  SovereignLocaleSchema, 
  type SovereignLocale 
} from '@agentevai/types-common';

/** 
 * @section RE-EXPORTAÇÃO DE SOBERANIA 
 * CURA TS2459: Permite que aparatos irmãos consumam o contrato sem redundância.
 */
export type { ISovereignDictionary };

const validatedDictionariesCache = new WeakSet<ISovereignDictionary>();

/**
 * @class SovereignTranslationEngine
 * @description Orquestrador estático para processamento linguístico regionalizado.
 */
export class SovereignTranslationEngine {
  private static readonly apparatusName = 'SovereignTranslationEngine';
  private static readonly fileLocation = 'libs/foundation/internationalization-engine/src/lib/handlers/SovereignTranslationEngine.ts';

  /**
   * @method translate
   * @description Resolve uma chave semântica, interpola variáveis e audita a Aura.
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

    // 2. Resolução do Fragmento de Aparato (Lego)
    const apparatusFragment = dictionary.content[apparatusName];
    if (!apparatusFragment) {
      this.reportSemanticEntropy('APPARATUS_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.activeLocale, correlationIdentifier);
      return `[MISSING_APPARATUS:${apparatusName}]`;
    }

    // 3. Resolução da Chave Semântica (Cura TS2339: 'value' -> 'semanticContent')
    const translationEntry = apparatusFragment[semanticKey];
    if (!translationEntry) {
      this.reportSemanticEntropy('KEY_NOT_FOUND', apparatusName, semanticKey, dictionary.metadata.activeLocale, correlationIdentifier);
      return `[UNDEFINED:${apparatusName}.${semanticKey}]`;
    }

    // 4. Auditoria de Aura (Neural Intelligence)
    const severity = translationEntry.aura?.severity;
    if (severity === 'CRITICAL' || severity === 'HIGH') {
      SovereignLogger({
        severity: 'WARN',
        apparatus: this.apparatusName,
        operation: 'HIGH_SEVERITY_STRING_RESOLVED',
        message: `Acesso a rastro de alta severidade: ${apparatusName}.${semanticKey}`,
        correlationIdentifier,
        metadata: { aura: translationEntry.aura }
      });
    }

    // 5. Interpolação e Selagem de Saída (Cura TS2339)
    return this.interpolate(translationEntry.semanticContent, variables, correlationIdentifier);
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
      // 6. CAPTURA FORENSE (Cura TS2741 e TS2353)
      const fingerprint = SovereignApparatusRegistry.getApparatusFingerprint(
        ApparatusIdentifierSchema.parse(this.apparatusName)
      );

      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-INTL-4001'),
        i18nMappingKey: 'DICTIONARY_STRUCTURE_CORRUPTED',
        severity: 'CRITICAL',
        apparatusMetadata: {
          name: this.apparatusName,
          version: '6.5.1',
          fileLocation: this.fileLocation,
          fingerprint: fingerprint // Injeção de marca nominal obrigatória
        },
        runtimeSnapshot: {
          inputPayload: { bundleVersion: dictionary?.metadata?.bundleVersion }, // Cura TS2339
          correlationIdentifier,
          validationIssues: integrityCheck.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stackTrace: new Error().stack || 'ST_UNAVAILABLE' // Cura TS2353
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

  /**
   * @method resolveLocale
   * @description Normaliza o Locale contra o ADN de Soberania.
   */
  public static resolveLocale(requestedLocale: string): SovereignLocale {
    const result = SovereignLocaleSchema.safeParse(requestedLocale);
    return result.success ? result.data : SovereignLocaleSchema.parse('pt-BR');
  }

  private static reportSemanticEntropy(
    entropyType: string,
    apparatus: string,
    key: string,
    locale: string,
    correlationIdentifier: string
  ): void {
    SovereignLogger({
      severity: 'ERROR',
      apparatus: this.apparatusName,
      operation: 'SEMANTIC_ENTROPY_DETECTED',
      message: `Dívida Semântica [${entropyType}]: ${apparatus}.${key} no território ${locale}.`,
      correlationIdentifier,
      metadata: { apparatus, key, locale }
    });
  }
}