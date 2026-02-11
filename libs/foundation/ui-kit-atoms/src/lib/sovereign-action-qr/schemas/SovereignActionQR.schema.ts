/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignActionQRSchema
 * @version 1.1.0
 * @protocol OEDP-V6.0 - Visual Authority
 * @description ADN para geração de pontos de acesso físico-digitais.
 * Saneado: Erradicada a radiação técnica 'any' via Casting de Soberania Nominal.
 * @policy ZERO-ANY: Saneamento absoluto via Branded Types.
 */

import { z } from 'zod';

/** 
 * @section Tipagem Nominal (Branded Types) 
 * Impede que strings cromáticas genéricas vazem para o motor de estilização.
 */
export const QuickResponseColorSchema = z.string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  .describe('Cor hexadecimal para conformidade com Design Tokens.')
  .brand<'QuickResponseColor'>();

export type QuickResponseColor = z.infer<typeof QuickResponseColorSchema>;

/** 
 * @name SovereignActionQRInputSchema 
 * @description Aduana de entrada para o aparato de Quick Response.
 */
export const SovereignActionQRInputSchema = z.object({
  /** URL que será selada no rastro geométrico */
  targetUrl: z.string()
    .url()
    .describe('Destino canônico da ação (URL).'),

  /** Tamanho físico em pixels */
  dimensionSize: z.number()
    .min(128)
    .max(1024)
    .default(256)
    .describe('Dimensão quadrática do rastro visual.'),

  /** Configurações de Soberania Estética */
  appearance: z.object({
    foregroundSovereignColor: QuickResponseColorSchema
      .describe('Cor dos módulos e âncoras do rastro visual.'),

    /** 
     * @section CURA_ESLINT_ANY 
     * Utilizamos o tipo nominal QuickResponseColor para o casting estrito.
     */
    backgroundSovereignColor: QuickResponseColorSchema
      .default('#FFFFFF' as QuickResponseColor),

    hasCentralLogo: z.boolean()
      .default(true)
      .describe('Sinalizador para inclusão de identidade de Reino no centro do QR.'),

    logoResourceUrl: z.string()
      .url()
      .optional()
      .describe('URL do logo de Reino para selagem central.')
  }).readonly(),

  /** 
   * @section Soberania Linguística 
   * Silo linguístico injetado via orquestração.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Dicionário regionalizado para instruções de acessibilidade.'),

  /** Identificador inalterável da jornada forense */
  correlationIdentifier: z.uuid()
    .describe('UUID de correlação para vínculo com o SovereignLogger.')
})
.brand<'SovereignActionQRInput'>()
.readonly();

export type ISovereignActionQRInput = z.infer<typeof SovereignActionQRInputSchema>;