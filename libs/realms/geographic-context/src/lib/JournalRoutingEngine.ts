/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JournalRoutingEngine
 * @version 2.1.0
 * @protocol OEDP-V5.5 - High Precision Routing
 * @description Motor de decisão hierárquica para ruteamento de Jornal Nacional vs Local.
 * Refatorado para erradicação de variáveis órfãs e alinhamento de rastro forense.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  type SovereignLocale,
  type SovereignCountry
} from '@agentevai/types-common';
import { TransmuteGeopoliticalId } from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/**
 * @name JournalRoutingParametersSchema
 * @description Aduana de ADN.
 * @section CORREÇÃO_HOLÍSTICA: Utilizamos os tipos importados explicitamente
 * na interface para garantir que a 'types-common' seja consumida de fato.
 */
export interface IJournalRoutingParameters {
  readonly activeLocale: SovereignLocale;
  readonly targetCountry: SovereignCountry;
  readonly stateCode?: string;
  readonly citySlug?: string;
  readonly preferredDestination?: string;
}

const JournalRoutingParametersSchema = z.object({
  activeLocale: SovereignLocaleSchema,
  targetCountry: SovereignCountrySchema,
  stateCode: z.string().length(2).toUpperCase().optional(),
  citySlug: z.string().min(2).toLowerCase().optional(),
  preferredDestination: z.string().optional(),
}).readonly();

export interface IRoutingDecision {
  readonly destinationPath: string;
  readonly decisionReason: 'GEO_DETECTION' | 'FALLBACK_NATIONAL' | 'USER_PREFERENCE_VAULT';
  readonly requiresExternalRedirect: boolean;
}

export class JournalRoutingEngine {
  private static readonly NATIONAL_SLUG = 'nacional';
  private static readonly APPARATUS_NAME = 'JournalRoutingEngine';

  /**
   * @method resolveInitialDestination
   * @description Calcula o destino soberano com base no rastro geográfico.
   */
  public static resolveInitialDestination(
    parameters: IJournalRoutingParameters,
    correlationIdentifier: string
  ): IRoutingDecision {
    // 1. Validação Aduaneira (ADN Check)
    const data = JournalRoutingParametersSchema.parse(parameters);

    // 2. Extração de Rota Soberana
    const routeSlug = TransmuteGeopoliticalId.countryToRoute(data.targetCountry);

    // 3. Orquestração de Decisão (Hierarquia de Pesos)

    if (data.preferredDestination) {
      return this.sealDecision(data.preferredDestination, 'USER_PREFERENCE_VAULT', true, correlationIdentifier);
    }

    if (data.stateCode && data.citySlug) {
      const localPath = `/${data.activeLocale}/${routeSlug}/${data.stateCode.toLowerCase()}/${data.citySlug}`;
      return this.sealDecision(localPath, 'GEO_DETECTION', true, correlationIdentifier);
    }

    const nationalPath = `/${data.activeLocale}/${routeSlug}/${this.NATIONAL_SLUG}`;
    return this.sealDecision(nationalPath, 'FALLBACK_NATIONAL', false, correlationIdentifier);
  }

  /**
   * @method sealDecision
   * @private Selagem e registro de telemetria.
   * @section CORREÇÃO_ESLINT: apparatusName integrado via static constant.
   */
  private static sealDecision(
    path: string,
    reason: IRoutingDecision['decisionReason'],
    isRedirect: boolean,
    correlationIdentifier: string
  ): IRoutingDecision {
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.APPARATUS_NAME, // Uso explícito da constante
      operation: 'ROUTING_DECISION_SEALED',
      message: `Ruteamento definido para [${path}] via [${reason}].`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        path,
        reason,
        isRedirect,
        engineVersion: '2.1.0'
      }
    });

    return Object.freeze({
      destinationPath: path,
      decisionReason: reason,
      requiresExternalRedirect: isRedirect
    });
  }
}
