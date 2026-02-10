/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentity
 * @version 2.3.0
 * @protocol OEDP-V6.0 - Edge Runtime Precision
 * @description Analisador de cabeceras de rede para determinação de identidade técnica.
 * Erradica o erro TS2304 ao unificar o rastro léxico e sela o ADN nominal.
 * @policy ZERO-ANY: Saneamento total de tipos.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica militar.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignLocaleSchema } from '@agentevai/types-common';

/**
 * @section Sincronia de ADN
 * Importação do rastro selado para garantir soberania de tipo.
 */
import {
  VisitorIdentitySchema,
  type IVisitorIdentity
} from '../schemas/VisitorIdentity.schema.js';
import { ResolveVisitorIdentityInputSchema } from './schemas/ResolveVisitorIdentity.schema.js';

/**
 * @name ResolveVisitorIdentity
 * @function
 * @description Transmuta cabeceras HTTP em uma identidade técnica selada e auditável.
 *
 * @param {Headers} networkHeaders - Cabeceras brutas da requisição de borda.
 * @param {string} correlationIdentifier - UUID obrigatório para rastro forense.
 * @returns {IVisitorIdentity} Identidade purificada e carimbada com marca nominal.
 */
export const ResolveVisitorIdentity = (
  networkHeaders: Headers,
  correlationIdentifier: string
): IVisitorIdentity => {
  const apparatusName = 'ResolveVisitorIdentity';

  // 1. ADUANA DE ENTRADA (Saneamento via Zod V4)
  const input = ResolveVisitorIdentityInputSchema.parse({
    userAgent: networkHeaders.get('user-agent') ?? undefined,
    acceptLanguage: networkHeaders.get('accept-language') ?? undefined,
    correlationIdentifier
  });

  // 2. INFERÊNCIA DE HARDWARE (Engine Mobile-First)
  let deviceType: IVisitorIdentity['deviceType'] = 'DESKTOP';

  /** @section Unificação Lexical: Rastro normalizado para análise */
  const userAgentContentInLowerCase = input.userAgent.toLowerCase();

  if (/bot|spider|crawl|slurp|bitly/i.test(userAgentContentInLowerCase)) {
    deviceType = 'BOT';
  } else if (/tablet|ipad|playbook|silk/i.test(userAgentContentInLowerCase)) {
    deviceType = 'TABLET';
  } else if (/mobile|android|iphone|ipod|iemobile|blackberry|kindle|opera mini/i.test(userAgentContentInLowerCase)) {
    deviceType = 'MOBILE';
  }

  // 3. NORMALIZAÇÃO DE ADN CULTURAL (Sincronia com Manifesto 0018)
  const rawLocaleSegment = input.acceptLanguage.split(',')[0].split(';')[0].trim();
  const localeValidation = SovereignLocaleSchema.safeParse(rawLocaleSegment);

  const activeSovereignLocale = localeValidation.success
    ? localeValidation.data
    : SovereignLocaleSchema.parse('pt-BR');

  /**
   * @section COMPOSIÇÃO DE RASTRO BRUTO
   * Mapeamento integral para o ADN de Identidade.
   */
  const rawVisitorSnapshot = {
    deviceType,
    preferredLocale: activeSovereignLocale,
    userAgent: input.userAgent,
    isHighPerformanceDevice: !/low-end|feature-phone|kaios/i.test(userAgentContentInLowerCase),
    browserEngine: userAgentContentInLowerCase.includes('applewebkit') ? 'WebKit' :
                   userAgentContentInLowerCase.includes('gecko') ? 'Gecko' : 'Unknown',
    isBot: deviceType === 'BOT'
  };

  /**
   * @section SELAGEM DE ADN
   * O método .parse() injeta o símbolo [$brand] exigido por IVisitorIdentity.
   */
  const validatedIdentity = VisitorIdentitySchema.parse(rawVisitorSnapshot);

  // 4. TELEMETRIA NEURAL (Sincronizado com Logger V6.0)
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'IDENTITY_ANCHORED',
    message: `Identidade resolvida e selada para [${validatedIdentity.preferredLocale}].`,
    correlationIdentifier: correlationIdentifier,
    metadata: {
      device: validatedIdentity.deviceType,
      performance: validatedIdentity.isHighPerformanceDevice ? 'ELITE' : 'STANDARD'
    }
  });

  return validatedIdentity;
};
