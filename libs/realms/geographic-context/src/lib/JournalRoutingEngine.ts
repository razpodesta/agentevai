/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JournalRoutingEngine
 * @version 3.1.0
 * @protocol OEDP-V6.0 - High Performance Deterministic Logic
 * @description Motor que orquestra a hierarquia de ruteamento nacional vs regional.
 * CURA TS2345: Injeção de marca nominal via Schema Parsing nas chamadas de selagem.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  TransmuteGeopoliticalId,
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import { 
  JournalRoutingParametersSchema,
  RoutingDecisionSchema,
  RoutingDecisionReasonSchema,
  type IJournalRoutingParameters,
  type IRoutingDecision,
  type RoutingDecisionReason
} from './schemas/JournalRoutingEngine.schema.js';

export class JournalRoutingEngine {
  private static readonly apparatusName = 'JournalRoutingEngine';
  private static readonly NATIONAL_SLUG = 'nacional';
  private static readonly fileLocation = 'libs/realms/geographic-context/src/lib/JournalRoutingEngine.ts';

  /**
   * @method resolveInitialDestination
   * @static
   * @description Resolve o destino soberano baseando-se no rastro geográfico e preferências.
   */
  public static resolveInitialDestination(
    parameters: IJournalRoutingParameters,
    dictionary: ISovereignDictionary
  ): IRoutingDecision {
    const apparatusName = this.apparatusName;

    try {
      // 1. ADUANA DE ENTRADA (Validando rastro e ADN)
      const data = JournalRoutingParametersSchema.parse(parameters);
      const { correlationIdentifier } = data;

      // 2. EXTRAÇÃO DE ROTA NACIONAL SINCRO (Protocolo V6.0)
      const countryRouteSlug = TransmuteGeopoliticalId.countryToRoute(
        data.targetSovereignCountry,
        correlationIdentifier,
        dictionary
      );

      // 3. ORQUESTRAÇÃO DE DECISÃO (Hierarquia de Soberania)
      
      // Nível I: Preferência do Cidadão (Cofre)
      if (data.preferredDestination) {
        return this.sealDecision(
          data.preferredDestination, 
          RoutingDecisionReasonSchema.parse('USER_PREFERENCE_VAULT'), // CURA TS2345
          true, 
          correlationIdentifier, 
          dictionary
        );
      }

      // Nível II: Localidade Detectada (IP/GPS)
      if (data.stateCode && data.citySlug) {
        const localPath = `/${data.activeSovereignLocale}/${countryRouteSlug}/${data.stateCode.toLowerCase()}/${data.citySlug}`;
        return this.sealDecision(
          localPath, 
          RoutingDecisionReasonSchema.parse('GEO_DETECTION'), // CURA TS2345
          true, 
          correlationIdentifier, 
          dictionary
        );
      }

      // Nível III: Fallback Nacional (Segurança Editorial)
      const nationalPath = `/${data.activeSovereignLocale}/${countryRouteSlug}/${this.NATIONAL_SLUG}`;
      return this.sealDecision(
        nationalPath, 
        RoutingDecisionReasonSchema.parse('FALLBACK_NATIONAL'), // CURA TS2345
        false, 
        correlationIdentifier, 
        dictionary
      );

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-GEO-6001'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier: parameters.correlationIdentifier,
        severity: 'CRITICAL',
        recoverySuggestion: 'Falha ao processar rastro geográfico. Forçar ruteamento para zona nacional segura.'
      });
    }
  }

  /**
   * @method sealDecision
   * @private Selagem de ADN e Telemetria Neural.
   */
  private static sealDecision(
    destinationPath: string,
    decisionReason: RoutingDecisionReason,
    requiresExternalRedirect: boolean,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): IRoutingDecision {
    const apparatusName = this.apparatusName;

    // Pilar V: Soberania Linguística
    const semanticMessage = SovereignTranslationEngine.translate(
      dictionary,
      apparatusName,
      'logRoutingDecision',
      { path: destinationPath, reason: decisionReason as unknown as string },
      correlationIdentifier
    );

    // Pilar VI: Telemetria Unificada
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'ROUTING_DECISION_SEALED',
      message: semanticMessage,
      correlationIdentifier,
      metadata: { 
        destinationPath, 
        reason: decisionReason, 
        redirect: requiresExternalRedirect 
      }
    });

    return RoutingDecisionSchema.parse({
      destinationPath,
      decisionReason,
      requiresExternalRedirect
    });
  }
}