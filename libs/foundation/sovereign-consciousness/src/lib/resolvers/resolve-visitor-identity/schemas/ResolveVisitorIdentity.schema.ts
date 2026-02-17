/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentitySchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Zenith Forensic DNA
 * @description ADN de elite para resolução de identidade técnica.
 * Sincronizado para Zod V4 Zenith: Erradicação de radiação 'any' e abreviações.
 */

import { z } from 'zod';

/**
 * @name ResolveVisitorIdentityInputSchema
 * @description Aduana de entrada estrita para captura de rastro de rede.
 */
export const ResolveVisitorIdentityInputSchema = z.object({
  userAgentRawText: z.string()
    .min(5)
    .describe('Rastro textual bruto do agente do usuário extraído do cabeçalho.'),

  acceptLanguageRawText: z.string()
    .default('pt-BR')
    .describe('Preferência cultural enviada via cabeçalho Accept-Language.'),

  /** Sincronia Zod V4: Uso do construtor de topo z.uuid() */
  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith inalterável para correlação total do rastro.')
})
.brand<'ResolveVisitorIdentityInput'>()
.readonly();

export type IResolveVisitorIdentityInput = z.infer<typeof ResolveVisitorIdentityInputSchema>;

/**
 * @name VisitorIdentityResultSchema
 * @description Contrato selado da identidade técnica resultante.
 */
export const VisitorIdentityResultSchema = z.object({
  deviceType: z.enum(['MOBILE', 'TABLET', 'DESKTOP', 'BOT']),
  browserEngine: z.enum(['WebKit', 'Blink', 'Gecko', 'Presto', 'Unknown']),
  preferredLocale: z.string().describe('Identificador BCP 47 validado.'),
  isHighPerformanceDevice: z.boolean(),
  isBot: z.boolean()
}).brand<'VisitorIdentityResult'>().readonly();

export type IVisitorIdentityResult = z.infer<typeof VisitorIdentityResultSchema>;
