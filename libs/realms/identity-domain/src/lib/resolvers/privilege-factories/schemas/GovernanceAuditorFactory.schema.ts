/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactorySchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Institutional Sovereignty
 * @description ADN de elite para a fábrica de auditores. 
 * Implementa a técnica de Selagem Tardia para compatibilidade de Reinos.
 */

import { z } from 'zod';
import { 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '../../../schemas/UserIdentity.schema.js';

/**
 * @name GovernanceAuditorFactoryBaseSchema
 * @description Estrutura fundamental sem marca nominal para a ponte de orquestração.
 */
export const GovernanceAuditorFactoryBaseSchema = z.object({
  reputationStanding: ReputationScoreSchema
    .describe('O mérito social necessário para o exercício da moderação.'),

  identityAssuranceLevel: IdentityAssuranceLevelSchema
    .describe('O nível de prova NIST verificado para autoridade institucional.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name GovernanceAuditorFactoryInputSchema
 * @description O contrato SELADO para uso interno estrito da fábrica.
 */
export const GovernanceAuditorFactoryInputSchema = GovernanceAuditorFactoryBaseSchema
  .brand<'GovernanceAuditorFactoryInput'>()
  .readonly();

export type IGovernanceAuditorFactoryInput = z.infer<typeof GovernanceAuditorFactoryInputSchema>;