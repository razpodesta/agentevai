/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenFactorySchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de elite para a fábrica de cidadãos. 
 * Implementa técnica de re-selagem para compatibilidade com orquestradores.
 */

import { z } from 'zod';
import { 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '../../../schemas/UserIdentity.schema.js';

/**
 * @name CitizenFactoryBaseSchema
 * @description Estrutura fundamental sem marca nominal. 
 * Usada para validar a ponte entre o orquestrador e a fábrica.
 */
export const CitizenFactoryBaseSchema = z.object({
  reputationStanding: ReputationScoreSchema
    .describe('O mérito social do cidadão extraído do snapshot de identidade.'),

  identityAssuranceLevel: IdentityAssuranceLevelSchema
    .describe('O nível de prova NIST verificado para cálculo de autoridade.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name CitizenFactoryInputSchema
 * @description O contrato SELADO para uso interno estrito da fábrica.
 */
export const CitizenFactoryInputSchema = CitizenFactoryBaseSchema
  .brand<'CitizenFactoryInput'>()
  .readonly();

export type ICitizenFactoryInput = z.infer<typeof CitizenFactoryInputSchema>;