/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VisitorIdentitySchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Forensic Precision & High Performance
 * @description ADN que define a identidade técnica, capacidades de hardware
 * e rastro cultural do visitante. Sincronizado com o Manifesto 0018.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica.
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';

/**
 * @section Taxonomia de Hardware e Software
 */
export const BrowserEngineSchema = z.enum(['WebKit', 'Blink', 'Gecko', 'Presto', 'Unknown'])
  .describe('Motor de renderização detectado para otimização de animações cinéticas.');

export const VisitorDeviceTypeSchema = z.enum(['MOBILE', 'TABLET', 'DESKTOP', 'BOT'])
  .describe('Categorização semântica do hardware para entrega de layouts adaptativos.');

/**
 * @name VisitorIdentitySchema
 * @description Aduana de ADN para a identidade técnica do visitante.
 * Utilizado pelo AI-Neural-Auditor para ajuste dinâmico de payload.
 */
export const VisitorIdentitySchema = z.object({
  /** Identidade Cultural validada (pt-BR, es-ES, en-US) */
  preferredLocale: SovereignLocaleSchema
    .describe('Identidade cultural preferida do visitante conforme padrão BCP 47.'),

  deviceType: VisitorDeviceTypeSchema,

  browserEngine: BrowserEngineSchema,

  userAgent: z.string()
    .min(5)
    .describe('Rastro textual bruto do agente do usuário para perícia forense.'),

  /** Orquestração de Performance */
  isHighPerformanceDevice: z.boolean()
    .describe('Sinalizador de capacidade de processamento para ativação de Aura Cinética.'),

  /** Borda de Segurança */
  isBot: z.boolean()
    .default(false)
    .describe('Indica se o rastro pertence a um autômato ou crawler.'),

})
.brand<'VisitorIdentity'>() // Selagem Nominal de Soberania
.readonly();

export type IVisitorIdentity = z.infer<typeof VisitorIdentitySchema>;
