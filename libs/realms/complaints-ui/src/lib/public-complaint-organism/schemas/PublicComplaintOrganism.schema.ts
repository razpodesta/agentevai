/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganismSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Visual Integrity
 * @description ADN que unifica dados de denúncia, autoridade e métricas sociais.
 * @policy ZOD-V4-SYNC: Uso de construtores de elite para IDs e rastro cronológico.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE', // Azul
  'MODERATE',    // Amarelo
  'CRITICAL',    // Vermelho
  'RESOLVED'     // Verde
]).describe('Nível de urgência determinado pela IA e Auditoria.');

export const PublicComplaintOrganismSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da denúncia.'),

  title: z.string().min(10).max(120)
    .transform(val => val.toUpperCase())
    .describe('Título editorial em caixa alta soberana.'),

  description: z.string().min(50),

  severity: ComplaintSeveritySchema,

  /** Integridade do Autor (Consome o ADN de Community) */
  author: CitizenAuraCardSchema,

  /** Evidência Visual */
  mediaUrl: z.string().url().optional(),

  /** Rastro de Soberania */
  merkleRootAnchor: z.string().length(64)
    .describe('Prova de imutabilidade blockchain.'),

  /** Métricas de Vontade */
  supportCount: z.number().int().nonnegative(),
  rejectionCount: z.number().int().nonnegative(),

  /** Localização do Fato */
  locationLabel: z.string().min(2).describe('Ex: Florianópolis, SC'),

  generatedAt: z.string().datetime(),
  correlationIdentifier: z.uuid()
}).readonly();

export type IPublicComplaintOrganism = z.infer<typeof PublicComplaintOrganismSchema>;
