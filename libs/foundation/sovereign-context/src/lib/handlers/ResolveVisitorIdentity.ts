/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentity
 * @version 1.1.0
 * @description Analizador de cabeceras de red para determinar la identidad técnica del visitante.
 * Optimizado para Next.js Edge Runtime.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { VisitorIdentitySchema, type IVisitorIdentity } from '../schemas/VisitorIdentity.schema.js';

/**
 * @name ResolveVisitorIdentity
 * @function
 * @description Transmuta las cabeceras HTTP en un objeto de identidad técnica validado.
 *
 * @param {Headers} headers - Cabeceras de la petición entrante (NextRequest.headers).
 * @returns {IVisitorIdentity} Identidad del visitante purificada.
 */
export const ResolveVisitorIdentity = (headers: Headers): IVisitorIdentity => {
  const apparatusName = 'ResolveVisitorIdentity';
  const userAgent = headers.get('user-agent') || 'UNKNOWN_AGENT';
  const acceptLanguage = headers.get('accept-language') || 'pt-BR';

  // Inferencia de tipo de aparato (Mobile First Engine)
  let deviceType: 'MOBILE' | 'TABLET' | 'DESKTOP' | 'BOT' = 'DESKTOP';

  if (/bot|spider|crawl|slurp|bitly/i.test(userAgent)) {
    deviceType = 'BOT';
  } else if (/tablet|ipad|playbook|silk/i.test(userAgent.toLowerCase())) {
    deviceType = 'TABLET';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(userAgent)) {
    deviceType = 'MOBILE';
  }

  // Resolución de idioma preferido (Solo el primer segmento relevante)
  const preferredLocale = acceptLanguage.split(',')[0].trim();

  const visitorData: IVisitorIdentity = {
    deviceType,
    preferredLocale,
    userAgent,
    isHighPerformanceDevice: !/low-end|feature-phone/i.test(userAgent),
    browserEngine: userAgent.includes('AppleWebKit') ? 'WebKit' :
                   userAgent.includes('Gecko') ? 'Gecko' : 'Unknown'
  };

  // Validación Aduanera
  const validatedIdentity = VisitorIdentitySchema.parse(visitorData);

  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'IDENTITY_RESOLVED',
    message: `Aparato detectado: ${validatedIdentity.deviceType} | Idioma: ${validatedIdentity.preferredLocale}`,
    metadata: { device: validatedIdentity.deviceType }
  });

  return validatedIdentity;
};
