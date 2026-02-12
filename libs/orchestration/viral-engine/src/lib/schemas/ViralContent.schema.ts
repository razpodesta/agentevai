/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ViralContentSchema
 * @version 6.1.0
 * @protocol OEDP-V6.0 - Master DNA Integrity
 * @description Única Fonte de Verdade (SSOT) para o enxame de difusão.
 * Erradicada a radiação de tipos primitivos via nominal branding.
 */

import { z } from 'zod';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

export const ViralPlatformSchema = z.enum([
  'X_COM',
  'META_FACEBOOK',
  'META_INSTAGRAM',
  'META_THREADS',
  'TIKTOK',
  'WHATSAPP'
])
.describe('Vetor de difusão social autorizado.')
.brand<'ViralPlatform'>();

export type ViralPlatform = z.infer<typeof ViralPlatformSchema>;

/* --- 🧱 SEÇÃO 2: ESTRUTURAS FUNDAMENTAIS (BASE SCHEMAS) --- */

export const MediaResourceAssetBaseSchema = z.object({
  resourceUniversalResourceLocator: z.string()
    .url()
    .describe('URL canônica da prova visual.'),

  assetType: z.enum(['IMAGE', 'VIDEO']),

  pixelDimensions: z.object({
    widthInPixels: z.number().int().positive(),
    heightInPixels: z.number().int().positive()
  }).optional()
});

/**
 * @name ViralCapsuleBaseSchema
 * @description Estrutura fundamental permitindo transformações parciais.
 */
export const ViralCapsuleBaseSchema = z.object({
  editorialTitle: z.string()
    .min(10).max(100),

  canonicalSourceUniversalResourceLocator: z.string()
    .url()
    .describe('Âncora de rastro original no portal.'),

  socialShareMessage: z.string()
    .max(280)
    .describe('Narrativa de impacto para redes sociais.'),

  mediaResourceAssets: z.array(MediaResourceAssetBaseSchema).min(1),

  merkleRootProof: z.string().length(64)
    .describe('Selo de imutabilidade blockchain.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação forense total.')
});

/* --- 📥 SEÇÃO 3: CONTRATOS SELADOS (SEALED INPUTS) --- */

/** @name ViralCapsuleSchema */
export const ViralCapsuleSchema = ViralCapsuleBaseSchema
  .brand<'ViralCapsule'>()
  .readonly();

export type IViralCapsule = z.infer<typeof ViralCapsuleSchema>;