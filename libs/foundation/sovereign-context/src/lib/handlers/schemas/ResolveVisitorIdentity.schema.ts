/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveVisitorIdentitySchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN de entrada para resolução de identidade técnica.
 * Sincronizado com Zod V4 para performance de elite.
 */

import { z } from 'zod';

/**
 * @name ResolveVisitorIdentityInputSchema
 * @description Aduana para validação de cabeceras brutas e rastro de jornada.
 */
export const ResolveVisitorIdentityInputSchema = z.object({
  userAgent: z.string()
    .default('UNKNOWN_AGENT')
    .describe('Rastro textual do agente do usuário (Browser/Bot).'),

  acceptLanguage: z.string()
    .default('pt-BR')
    .describe('Preferência cultural enviada pelo cabeçalho de rede.'),

  /** Sincronia Zod v4: Uso do construtor de elite z.uuid() */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
}).readonly();

export type IResolveVisitorIdentityInput = z.infer<typeof ResolveVisitorIdentityInputSchema>;
