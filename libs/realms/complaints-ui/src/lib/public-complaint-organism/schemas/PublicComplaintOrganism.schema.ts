/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganismSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5.2 - High Precision & Structural ADN
 * @description Única Fonte de Verdade (SSOT) para o aparato de denúncia pública.
 * Implementa tipagem nominal (Branding) e rastro forense para auditoria de fé pública.
 * @policy ZOD-V4-SYNC: Construtores de topo e precedência de modificadores estruturais.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';

/**
 * @section Dimensão de Identidade Nominal (Branded Types)
 */

export const ComplaintIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da denúncia no ecossistema.')
  .brand<'ComplaintIdentifier'>();

export type ComplaintIdentifier = z.infer<typeof ComplaintIdentifierSchema>;

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE', // Estética: Azul (Aviso Comunitário)
  'MODERATE',    // Estética: Âmbar (Em Investigação)
  'CRITICAL',    // Estética: Vermelho (Risco Iminente)
  'RESOLVED'     // Estética: Verde (Justiça Alcançada)
]).describe('Índice de urgência e impacto social determinado pela IA de Borda.')
  .brand<'ComplaintSeverity'>();

export type ComplaintSeverity = z.infer<typeof ComplaintSeveritySchema>;

/**
 * @name PublicComplaintOrganismInputSchema
 * @description Aduana de entrada estrita para o orquestrador de denúncias.
 * Mapeia a integração entre Identidade (Author) e Governança (Merkle Root).
 */
export const PublicComplaintOrganismInputSchema = z.object({
  identifier: ComplaintIdentifierSchema,

  title: z.string()
    .min(10, { message: 'TITLE_TOO_SHORT' })
    .max(120)
    .transform(value => value.toUpperCase())
    .describe('Título editorial em caixa alta soberana para impacto visual.'),

  description: z.string()
    .min(50, { message: 'DESCRIPTION_INSUFFICIENT' })
    .describe('Relato detalhado e fundamentado do problema público identificado.'),

  severity: ComplaintSeveritySchema,

  /** 
   * @section Sincronia de Borda (Community Interface)
   * Consome o ADN validado do CitizenAuraCard para garantir autoridade do autor.
   */
  author: CitizenAuraCardSchema,

  /** Evidência Visual Opcional */
  mediaUrl: z.string()
    .url()
    .optional()
    .describe('Rastro de evidência multimídia hospedado em CDN soberana.'),

  /** 
   * @section Rastro de Fé Pública (Governance Interface)
   * Digital matemática inalterável provando a existência da causa na rede.
   */
  merkleRootAnchor: z.string()
    .length(64)
    .describe('Âncora SHA-256 gerada pelo Blockchain-Ledger para selagem do fato.'),

  /** Métricas de Engajamento e Vontade Cidadã */
  supportCount: z.number()
    .int()
    .nonnegative()
    .describe('Volume total de assinaturas de apoio eletrônico registradas.'),

  rejectionCount: z.number()
    .int()
    .nonnegative()
    .describe('Volume de contestações ou sinalizações de irregularidade.'),

  /** Localização Geopolítica do Fato */
  locationLabel: z.string()
    .min(2)
    .describe('Identificador textual da localidade (Ex: Florianópolis, SC).'),

  /** Metadados de Auditoria e Sincronia Linguística */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo de tradução regional injetado pelo motor de i18n.'),

  generatedAt: z.string()
    .datetime()
    .describe('Marca temporal ISO-8601 da ignição deste rastro editorial.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para cruzamento de logs.')

}).readonly(); // Selagem final de imutabilidade

/**
 * @interface IPublicComplaintOrganismInput
 * @description Contrato estrito para as propriedades do organismo.
 */
export type IPublicComplaintOrganismInput = z.infer<typeof PublicComplaintOrganismInputSchema>;