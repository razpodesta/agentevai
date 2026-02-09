/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMiddleware
 * @version 2.3.0
 * @protocol OEDP-V5.5 - High Precision & Zero-Any
 * @description Centro neurálgico de borda. Gerencia defesa antibot,
 * resolução de território e ruteamento dinâmico hierárquico.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { ExecuteBotSentinel } from '@agentevai/security-auditor';
import {
  ResolveVisitorIdentity,
  SovereignCountrySchema
} from '@agentevai/sovereign-context';
import { LookupTerritorialAnchor } from '@agentevai/geographic-context';
import { TransmuteGeopoliticalId } from '@agentevai/internationalization-engine';

/**
 * @name middleware
 * @function
 * @description Intercepta petições para injetar consciência regional e rastro forense.
 */
export async function middleware(request: NextRequest) {
  const correlationIdentifier = crypto.randomUUID();

  /**
   * @section IP_FORENSIC_EXTRACTION (Fix TS2339)
   * Extração resiliente via cabeceras de elite (Cloudflare/Vercel/Nginx).
   * Resolve a ausência da propriedade '.ip' em certos contextos de compilação.
   */
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                   request.headers.get('x-real-ip') ||
                   '127.0.0.1';

  // 🛡️ 1. DEFESA SOBERANA (Hard Shield)
  if (ExecuteBotSentinel(request)) {
    return new NextResponse('Sovereign Shield: Access Denied', { status: 403 });
  }

  // 👤 2. IDENTIDADE TÉCNICA E CULTURAL
  const visitorIdentity = ResolveVisitorIdentity(request.headers);
  const activeLocale = TransmuteGeopoliticalId.routeToLocale(visitorIdentity.preferredLocale);

  // 🗺️ 3. ANCORAGEM TERRITORIAL
  // Agora o rastro de exportação TS2305 está sanado.
  const geoAnchor = await LookupTerritorialAnchor(clientIp, correlationIdentifier);

  // Normalização de ADN Nacional (Manifesto 0018)
  const countryCode = SovereignCountrySchema.parse(geoAnchor.countryCode || 'BR');
  const routeSlug = TransmuteGeopoliticalId.countryToRoute(countryCode);

  // 🚀 4. MOTOR DE RUTEAMENTO HIERÁRQUICO
  // Redirecionamento automático se o cidadão acessa a raiz "/"
  if (request.nextUrl.pathname === '/') {
    const journalUrl = request.nextUrl.clone();

    const state = geoAnchor.stateCode ? String(geoAnchor.stateCode).toLowerCase() : null;
    const city = geoAnchor.slug ? String(geoAnchor.slug) : null;

    if (state && city) {
      // Destino: /[locale]/[country]/[state]/[city] (Jornal Local)
      journalUrl.pathname = `/${activeLocale}/${routeSlug}/${state}/${city}`;
    } else {
      // Destino: /[locale]/[country]/nacional (Jornal Nacional)
      journalUrl.pathname = `/${activeLocale}/${routeSlug}/nacional`;
    }

    return NextResponse.redirect(journalUrl);
  }

  // 📝 5. SELAGEM DE RESPOSTA (Rastro Forense)
  const response = NextResponse.next();

  response.headers.set('x-agv-correlation-id', correlationIdentifier);
  response.headers.set('x-agv-visitor-device', visitorIdentity.deviceType);
  response.headers.set('x-agv-sovereign-locale', activeLocale);

  return response;
}

/**
 * @section Configuração de Matcher
 * Define as fronteiras de atuação do middleware, excluindo ativos estáticos e APIs.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
