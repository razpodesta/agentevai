/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentity
 * @version 7.0.1
 * @protocol OEDP-V7.0 - High Performance Zenith
 * @description Transmuta cabeçalhos de rede em uma identidade técnica selada.
 * CURADO: Erradicado erro TS2345 via selagem nominal do rastro de telemetria.
 */

import {
  SovereignLogger,
  SovereignLoggerSchema
} from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';

/** @section Sincronia de ADN Zenith */
import {
  ResolveVisitorIdentityInputSchema,
  VisitorIdentityResultSchema,
  type IVisitorIdentityResult
} from './schemas/ResolveVisitorIdentity.schema.js';

/**
 * @name ResolveVisitorIdentity
 * @function
 * @description Analisador de borda para determinação de identidade técnica e capacidades.
 */
export const ResolveVisitorIdentity = (
  networkHeaders: Headers,
  correlationIdentifier: string
): IVisitorIdentityResult => {
  const apparatusName = 'ResolveVisitorIdentity';
  const startTimestamp = performance.now();

  // 1. REGISTRO NO CARTÓRIO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.0.1',
    complexityTier: 'INTEGRATION_DRIVER',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, correlationIdentifier);

  // 2. ADUANA DE ENTRADA (Higiene Lexical)
  const input = ResolveVisitorIdentityInputSchema.parse({
    userAgentRawText: networkHeaders.get('user-agent') ?? 'Unknown',
    acceptLanguageRawText: networkHeaders.get('accept-language') ?? 'pt-BR',
    correlationIdentifier
  });

  const userAgentContent = input.userAgentRawText.toLowerCase();

  // 3. INFERÊNCIA DE HARDWARE (Doutrina Mobile-First)
  let detectedDevice: 'MOBILE' | 'TABLET' | 'DESKTOP' | 'BOT' = 'DESKTOP';

  if (/bot|spider|crawl|slurp/i.test(userAgentContent)) detectedDevice = 'BOT';
  else if (/tablet|ipad|playbook|silk/i.test(userAgentContent)) detectedDevice = 'TABLET';
  else if (/mobile|android|iphone|ipod/i.test(userAgentContent)) detectedDevice = 'MOBILE';

  // 4. INFERÊNCIA DE MOTOR (Aura Cinética)
  let detectedEngine: 'WebKit' | 'Blink' | 'Gecko' | 'Presto' | 'Unknown' = 'Unknown';
  if (userAgentContent.includes('applewebkit')) detectedEngine = 'WebKit';
  else if (userAgentContent.includes('gecko')) detectedEngine = 'Gecko';
  else if (userAgentContent.includes('chrome')) detectedEngine = 'Blink';

  // 5. SELAGEM FINAL (Branded Result)
  const result = VisitorIdentityResultSchema.parse({
    deviceType: detectedDevice,
    browserEngine: detectedEngine,
    preferredLocale: input.acceptLanguageRawText.split(',')[0],
    isHighPerformanceDevice: !/low-end|feature-phone|kaios/i.test(userAgentContent),
    isBot: detectedDevice === 'BOT'
  });

  const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

  // 6. TELEMETRIA NEURAL (Cura TS2345)
  /**
   * @section Selagem_de_Rastro
   * Transmutação do payload em uma entidade nominal validada pelo motor de telemetria.
   */
  const telemetryPayload = SovereignLoggerSchema.parse({
    severity: 'INFO',
    apparatusIdentifier: apparatusName,
    operationCode: 'IDENTITY_RESOLVED',
    semanticMessage: `Identidade técnica selada para [${detectedDevice}] via motor [${detectedEngine}].`,
    correlationIdentifier: correlationIdentifier,
    executionLatencyInMilliseconds: executionLatency,
    forensicMetadata: {
      performance: result.isHighPerformanceDevice ? 'ELITE' : 'STANDARD',
      locale: result.preferredLocale
    }
  });

  SovereignLogger(telemetryPayload);

  return result;
};
