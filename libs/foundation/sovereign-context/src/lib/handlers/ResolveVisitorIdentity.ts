/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentity
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance DNA
 * @description Transmuta cabeçalhos de rede em uma identidade técnica selada.
 * CURADO: Erradicado o uso de 'any' conforme rastro de lint @typescript-eslint/no-explicit-any.
 */

import { SovereignLocaleSchema } from '@agentevai/types-common';
import { 
  VisitorIdentitySchema, 
  VisitorDeviceTypeSchema,
  BrowserEngineSchema,
  ResolveVisitorIdentityInputSchema,
  type IVisitorIdentity 
} from '../schemas/VisitorIdentity.schema.js';

/**
 * @name ResolveVisitorIdentity
 * @function
 * @description Analisador de borda para determinação de identidade técnica.
 */
export const ResolveVisitorIdentity = (
  networkHeaders: Headers,
  correlationIdentifier: string
): IVisitorIdentity => {
  // 1. ADUANA DE ENTRADA
  const validatedInput = ResolveVisitorIdentityInputSchema.parse({
    userAgentRaw: networkHeaders.get('user-agent') ?? 'Unknown',
    acceptLanguageRaw: networkHeaders.get('accept-language') ?? 'pt-BR',
    correlationIdentifier
  });

  const userAgentContent = validatedInput.userAgentRaw.toLowerCase();

  // 2. INFERÊNCIA DE HARDWARE (Cura do 'any' via Schema Mapping)
  let rawDeviceType = 'DESKTOP';
  
  if (/bot|spider|crawl/i.test(userAgentContent)) rawDeviceType = 'BOT';
  else if (/tablet|ipad/i.test(userAgentContent)) rawDeviceType = 'TABLET';
  else if (/mobile|android|iphone|ipod/i.test(userAgentContent)) rawDeviceType = 'MOBILE';

  // 3. INFERÊNCIA DE MOTOR
  let rawEngine = 'Unknown';
  if (userAgentContent.includes('applewebkit')) rawEngine = 'WebKit';
  else if (userAgentContent.includes('gecko')) rawEngine = 'Gecko';
  else if (userAgentContent.includes('chrome')) rawEngine = 'Blink';

  // 4. SELAGEM FINAL (O parse injeta a marca nominal $brand)
  return VisitorIdentitySchema.parse({
    preferredLocale: SovereignLocaleSchema.parse(validatedInput.acceptLanguageRaw.split(',')[0]),
    deviceType: VisitorDeviceTypeSchema.parse(rawDeviceType), // CURA TS: Uso do Schema
    browserEngine: BrowserEngineSchema.parse(rawEngine),       // CURA TS: Uso do Schema
    userAgentSnapshot: validatedInput.userAgentRaw,
    isHighPerformanceDevice: !/low-end|feature-phone/i.test(userAgentContent),
    isBot: rawDeviceType === 'BOT'
  });
};