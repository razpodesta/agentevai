/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VisitorIdentitySchema
 * @version 1.2.0
 * @protocol OEDP-V5.5 - High Precision & Neural Integrity
 * @description ADN para a identificação técnica e capacidades do aparato do visitante.
 * Alinhado ao Manifesto 0018 para consistência de Locale e Soberania.
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const BrowserEngineSchema = z.enum(['WebKit', 'Blink', 'Gecko', 'Presto', 'Unknown'])
  .describe('Motor de renderização detectado para otimização de CSS e animações cinéticas.');

export const VisitorDeviceTypeSchema = z.enum(['MOBILE', 'TABLET', 'DESKTOP', 'BOT'])
  .describe('Categorização semântica do hardware para entrega de layouts Mobile-First.');

/**
 * @name VisitorIdentitySchema
 * @description Aduana de ADN para a identidade técnica do visitante.
 * Monitorado pelo AI-Neural-Auditor para ajuste de carga de renderização.
 */
export const VisitorIdentitySchema = z.object({
  /**
   * @section Sincronia Geopolítica
   * Garante que o idioma detectado pelo navegador seja validado contra nossa malha soberana.
   */
  preferredLocale: SovereignLocaleSchema
    .describe('Identidade cultural preferida do visitante, validada contra o padrão BCP 47.'),

  deviceType: VisitorDeviceTypeSchema,

  browserEngine: BrowserEngineSchema,

  userAgent: z.string()
    .min(5)
    .describe('Rastro forense bruto do agente do usuário para análise de vulnerabilidades.'),

  /**
   * @section Orquestração de Performance (Fase 5.5)
   * Utilizado pelo Framer Motion para decidir entre animações 3D ou degradadas.
   */
  isHighPerformanceDevice: z.boolean()
    .describe('Inferência de capacidade de CPU/GPU para habilitar experiência cinética total.'),

  /**
   * @section Segurança e Defesa
   * Sinalizador de integridade para o SovereignShield.
   */
  isBot: z.boolean()
    .default(false)
    .describe('Indica se o visitante é um autômato (Search Crawler ou Malicious Script).'),

}).readonly();

/**
 * @interface IVisitorIdentity
 * @description Interface imutável e Branded para consumo em todo o ecossistema.
 */
export type IVisitorIdentity = z.infer<typeof VisitorIdentitySchema> & { readonly __brand?: 'VisitorIdentity' };
