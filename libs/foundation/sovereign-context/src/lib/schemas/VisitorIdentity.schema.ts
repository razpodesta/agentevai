/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VisitorIdentitySchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Forensic Precision DNA
 * @description SSOT para identidade técnica. Define a aduana de entrada e o contrato selado de saída.
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';

/* --- 🛡️ SUB-CONTRATOS NOMINAIS --- */

export const BrowserEngineSchema = z.enum(['WebKit', 'Blink', 'Gecko', 'Presto', 'Unknown'])
  .brand<'BrowserEngine'>();

export const VisitorDeviceTypeSchema = z.enum(['MOBILE', 'TABLET', 'DESKTOP', 'BOT'])
  .brand<'VisitorDeviceType'>();

/* --- 📥 ADUANA DE ENTRADA (INPUT) --- */

export const ResolveVisitorIdentityInputSchema = z.object({
  userAgentRaw: z.string()
    .min(5)
    .describe('Rastro textual bruto do agente do usuário.'),
    
  acceptLanguageRaw: z.string()
    .default('pt-BR')
    .describe('Preferência cultural enviada via cabeçalho de rede.'),
    
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense.')
})
.brand<'ResolveVisitorIdentityInput'>()
.readonly();

/* --- 🏛️ CONTRATO DE DOMÍNIO (RESULT) --- */

export const VisitorIdentityBaseSchema = z.object({
  preferredLocale: SovereignLocaleSchema,
  deviceType: VisitorDeviceTypeSchema,
  browserEngine: BrowserEngineSchema,
  userAgentSnapshot: z.string(),
  isHighPerformanceDevice: z.boolean(),
  isBot: z.boolean(),
});

export const VisitorIdentitySchema = VisitorIdentityBaseSchema
  .brand<'VisitorIdentity'>()
  .readonly();

export type IVisitorIdentity = z.infer<typeof VisitorIdentitySchema>;
export type IResolveVisitorIdentityInput = z.infer<typeof ResolveVisitorIdentityInputSchema>;