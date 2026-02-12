/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentity
 * @version 3.0.0
 * @description Transmuta cabeçalhos de rede em uma identidade técnica selada.
 */

import { SovereignLocaleSchema } from '@agentevai/types-common';
import { 
  VisitorIdentitySchema, 
  VisitorDeviceTypeSchema,
  BrowserEngineSchema,
  ResolveVisitorIdentityInputSchema,
  type IVisitorIdentity 
} from '../schemas/VisitorIdentity.schema.js';

export const ResolveVisitorIdentity = (
  networkHeaders: Headers,
  correlationIdentifier: string
): IVisitorIdentity => {
  // 1. ADUANA DE ENTRADA
  const input = ResolveVisitorIdentityInputSchema.parse({
    userAgentRaw: networkHeaders.get('user-agent') ?? 'Unknown',
    acceptLanguageRaw: networkHeaders.get('accept-language') ?? 'pt-BR',
    correlationIdentifier
  });

  const ua = input.userAgentRaw.toLowerCase();

  // 2. INFERÊNCIA DE HARDWARE (Lógica Inteligente)
  let deviceType: any = 'DESKTOP';
  if (/bot|spider|crawl/i.test(ua)) deviceType = 'BOT';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'TABLET';
  else if (/mobile|android|iphone/i.test(ua)) deviceType = 'MOBILE';

  // 3. INFERÊNCIA DE MOTOR
  let engine: any = 'Unknown';
  if (ua.includes('applewebkit')) engine = 'WebKit';
  else if (ua.includes('gecko')) engine = 'Gecko';
  else if (ua.includes('chrome')) engine = 'Blink';

  // 4. SELAGEM FINAL
  return VisitorIdentitySchema.parse({
    preferredLocale: SovereignLocaleSchema.parse(input.acceptLanguageRaw.split(',')[0]),
    deviceType: VisitorDeviceTypeSchema.parse(deviceType),
    browserEngine: BrowserEngineSchema.parse(engine),
    userAgentSnapshot: input.userAgentRaw,
    isHighPerformanceDevice: !/low-end|feature-phone/i.test(ua),
    isBot: deviceType === 'BOT'
  });
};