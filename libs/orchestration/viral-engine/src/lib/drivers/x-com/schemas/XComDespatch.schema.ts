/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus XComDespatchSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN mestre para difusão no X.com. 
 * Erradicada a obsessão por primitivos e abreviações (id -> identifier).
 */

import { z } from 'zod';

/** 
 * @name XComConstraintsSchema 
 * @description Regras físicas inalteráveis da plataforma X Corp.
 */
export const XComConstraintsSchema = z.object({
  maxCharacterCount: z.literal(280),
  allowedMediaFormats: z.enum(['image/png', 'image/jpeg', 'image/webp', 'video/mp4']),
  recommendedAspectRatio: z.literal('1.91:1')
}).readonly();

/** 
 * @name XComDespatchBaseSchema 
 * @description Estrutura fundamental para auditoria e perícia.
 */
export const XComDespatchBaseSchema = z.object({
  /** Narrativa final processada para o post */
  statusText: z.string()
    .min(1)
    .max(280)
    .describe('O conteúdo textual final respeitando a soberania de caracteres do X.com.'),

  /** Identificadores de mídia previamente carregados */
  mediaResourceIdentifiers: z.array(z.string())
    .max(4)
    .describe('Lista de identificadores técnicos de mídia selada.'),

  /** Rastro de correlação Zenith */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável para correlação total do rastro forense.')
});

/** 
 * @name XComDespatchInputSchema 
 * @description Contrato SELADO e NOMINAL para execução de despacho.
 */
export const XComDespatchInputSchema = XComDespatchBaseSchema
  .brand<'XComDespatchInput'>()
  .readonly();

export type IXComDespatchInput = z.infer<typeof XComDespatchInputSchema>;