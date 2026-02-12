/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRedirector
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Transition Zone
 * @description Realiza a ancoragem cultural inicial. Redireciona para o [locale] soberano.
 */

import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { SovereignLogger } from '@agentevai/sovereign-logger';

export default async function SovereignRedirector() {
  const correlationIdentifier = crypto.randomUUID();
  const requestHeaders = await headers();
  const requestCookies = await cookies();

  // 1. RESOLUÇÃO DE RASTRO CULTURAL
  // Prioridade: Cookie de Preferência > Cabeçalho Accept-Language > Default (pt-BR)
  const storedLocale = requestCookies.get('agv_preferred_locale')?.value;
  const browserLanguage = requestHeaders.get('accept-language')?.split(',')[0].split('-')[0];
  
  const targetLocale = storedLocale || (browserLanguage === 'es' ? 'es-ES' : browserLanguage === 'en' ? 'en-US' : 'pt-BR');

  // 2. TELEMETRIA DE TRANSIÇÃO
  SovereignLogger({
    severity: 'INFO',
    apparatus: 'SovereignRedirector',
    operation: 'ROOT_ACCESS_REDIRECT',
    message: `Cidadão detectado na raiz. Redirecionando para Soberania Territorial: [${targetLocale}].`,
    correlationIdentifier
  });

  // 3. SALTO SOBERANO
  redirect(`/${targetLocale}`);
}