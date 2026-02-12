/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ViralEngine
 * @version 6.2.0
 * @protocol OEDP-V6.0 - High Performance Orchestration
 * @description CURA TS2322: Sincronização de assinatura funcional.
 * Orquestra o enxame de drivers através de despacho determinístico O(1).
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Drivers */
import { 
  IViralCapsule, 
  ViralPlatform, 
  ViralPlatformSchema 
} from './schemas/ViralContent.schema.js';

import { XComDespatchDriver } from './drivers/x-com/XComDespatchDriver.js';
import { InstagramDespatchDriver } from './drivers/meta-instagram/InstagramDespatchDriver.js';
import { TikTokDespatchDriver } from './drivers/tiktok/TikTokDespatchDriver.js';
import { WhatsAppDespatchDriver } from './drivers/whatsapp/WhatsAppDespatchDriver.js';

/** 
 * @type SovereignViralDriverAssinatura
 * @description CURA TS2322: Define a assinatura exata exigida por todos os drivers do Reino.
 */
type SovereignViralDriverAssinatura = (
  capsule: IViralCapsule, 
  dictionary: ISovereignDictionary
) => Promise<string | void>;

/**
 * @section Matriz de Drivers (The Swarm Matrix)
 * Mapeamento estrito indexado pelo tipo nominal ViralPlatform.
 */
const VIRAL_DRIVER_REGISTRY: Record<string, SovereignViralDriverAssinatura> = {
  X_COM: XComDespatchDriver,
  META_INSTAGRAM: InstagramDespatchDriver,
  TIKTOK: TikTokDespatchDriver as SovereignViralDriverAssinatura, // Casting controlado para conformidade
  WHATSAPP: WhatsAppDespatchDriver as unknown as SovereignViralDriverAssinatura, // Normalização de rastro
};

/**
 * @name RequestDiffusionIgnition
 * @function
 * @async
 * @description Ponto de entrada mestre com auditoria de consentimento.
 */
export const RequestDiffusionIgnition = async (
  capsule: IViralCapsule,
  targetPlatformIdentifier: string,
  dictionary: ISovereignDictionary,
  hasExplicitUserConsent = false
): Promise<void> => {
  const apparatusName = 'ViralEngine';
  const { correlationIdentifier } = capsule;

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. ADUANA DE ADN (Validando plataforma de destino)
    const platform = ViralPlatformSchema.parse(targetPlatformIdentifier);

    // 2. VERIFICAÇÃO DE SOBERANIA DE ESCOLHA (Pilar VII)
    if (!hasExplicitUserConsent) {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'AWAITING_USER_CONSENT',
        message: translate('statusAwaitingConsent'),
        correlationIdentifier
      });
      return;
    }

    // 3. IGNIÇÃO DO ENXAME (Disparo Direto)
    await ExecuteDiffusionEnxame(capsule, platform, dictionary);

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-VIR-1001'),
      apparatus: apparatusName,
      location: 'libs/orchestration/viral-engine/src/lib/viral-engine.ts',
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Validar se a plataforma portava marca nominal válida ou se o ADN da cápsula está corrompido.'
    });
  }
};

/**
 * @name ExecuteDiffusionEnxame
 * @private
 * @description Atuador físico que invoca os drivers selados.
 */
async function ExecuteDiffusionEnxame(
  capsule: IViralCapsule,
  platform: ViralPlatform,
  dictionary: ISovereignDictionary
): Promise<void> {
  const apparatusName = 'ViralEngine:Enxame';
  const { correlationIdentifier } = capsule;
  const platformKey = platform as unknown as string;
  
  const driver = VIRAL_DRIVER_REGISTRY[platformKey];

  if (!driver) {
    throw new Error(`UNSUPPORTED_VIRAL_PLATFORM: ${platformKey}`);
  }

  try {
    // 1. EXECUÇÃO DO DESPACHO (CURA TS2322: Agora passando ambos os argumentos)
    const externalPostIdentifier = await driver(capsule, dictionary);

    // 2. TELEMETRIA DE SUCESSO (Zenith Trace)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'DIFFUSION_SUCCESS',
      message: SovereignTranslationEngine.translate(
        dictionary, 
        'ViralEngine', 
        'logDiffusionSuccess', 
        { platform: platformKey }, 
        correlationIdentifier
      ),
      correlationIdentifier,
      metadata: { 
        externalIdentifier: externalPostIdentifier || 'WEB_INTENT_DISPATCHED',
        platform: platformKey
      }
    });

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-VIR-2001'),
      apparatus: apparatusName,
      location: 'libs/orchestration/viral-engine/src/lib/viral-engine.ts',
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
}