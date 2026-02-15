/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ApparatusRegistrySchema
 * @version 1.1.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description Define a certidão de nascimento técnica de cada Lego do sistema.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded Types) 
 * CURA TS2305: Membros agora exportados formalmente.
 */
export const ApparatusIdentifierSchema = z.string()
  .min(3)
  .regex(/^[A-Z][a-zA-Z0-9]+$/)
  .describe('Nome PascalCase único do aparato para o rastro forense.')
  .brand<'ApparatusIdentifier'>();

export type ApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;

export const StabilityScoreSchema = z.number()
  .min(0).max(100)
  .describe('Índice de resiliência (0-100) auditado por IA.')
  .brand<'StabilityScore'>();

export type StabilityScore = z.infer<typeof StabilityScoreSchema>;

/** 
 * @name ApparatusTechnicalPassportSchema 
 */
export const ApparatusTechnicalPassportSchema = z.object({
  identifier: ApparatusIdentifierSchema,
  
  authorName: z.string()
    .min(3)
    .describe('Assinatura do engenheiro responsável (ex: Raz Podestá).'),
    
  semanticVersion: z.string()
    .regex(/^\d+\.\d+\.\d+$/)
    .describe('Versão SemVer inalterável.'),
    
  complexityTier: z.enum(['ATOM', 'MOLECULE', 'ORGANISM', 'REALM_LOGIC', 'INTEGRATION_DRIVER']),
  
  stabilityScore: StabilityScoreSchema,
  
  isSealedForProduction: z.boolean().default(false),
  
  registeredAt: z.string().datetime()
}).readonly();

export type IApparatusTechnicalPassport = z.infer<typeof ApparatusTechnicalPassportSchema>;