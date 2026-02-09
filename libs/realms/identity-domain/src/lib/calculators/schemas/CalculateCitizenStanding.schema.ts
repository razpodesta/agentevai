/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStandingSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5.1 - High Precision & Forensic Integrity
 * @description ADN estrutural para o motor de evolução de reputação.
 * Erradica a radiação técnica ao vincular a entrada ao ADN de Identidade.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral.
 * @policy BRANDED-TYPES-ENFORCEMENT: Uso de esquemas nominais para evitar colisões.
 */

import { z } from 'zod';
import {
  ReputationScoreSchema
} from '../../schemas/UserIdentity.schema.js';

/**
 * @name ImpactTypeSchema
 * @description Categorias semânticas de eventos que alteram a percepção social do cidadão.
 */
export const ImpactTypeSchema = z.enum([
  'COMPLAINT_VERIFIED',    // Validação institucional/IA (+50)
  'SUPPORT_RECEIVED',      // Reconhecimento de pares (+5)
  'SUPPORT_GIVEN',         // Engajamento proativo (+1)
  'ENTROPY_DETECTED',      // Comportamento tóxico/Spam (-100)
  'FAKE_NEWS_CONFIRMED',   // Violação de veracidade (-500)
  'SENIORITY_MILESTONE'    // Lealdade temporal (+10)
]).describe('Tipo de impacto social detectado para processamento aritmético.');

/**
 * @name CalculateCitizenStandingInputSchema
 * @description Aduana de entrada para o motor atômico.
 * @section RESOLUÇÃO_ESLINT: ReputationScoreSchema agora é consumido formalmente.
 */
export const CalculateCitizenStandingInputSchema = z.object({
  /**
   * @section Sincronia de ADN
   * Aplicamos o ReputationScoreSchema (que já possui min/max e branding).
   */
  currentReputationScore: ReputationScoreSchema
    .describe('O standing social atual do cidadão extraído do snapshot de identidade.'),

  impactType: ImpactTypeSchema,

  neuralMultiplier: z.number()
    .min(0.5)
    .max(5)
    .default(1)
    .describe('Fator de ajuste injetado pela IA baseado na qualidade das evidências.'),

  correlationIdentifier: z.uuid()
    .describe('Rastro forense inalterável da jornada operativa.')
}).readonly();

/**
 * @interface ICalculateCitizenStandingInput
 * @description Interface resultante para tipagem de parâmetros no calculador.
 */
export type ICalculateCitizenStandingInput = z.infer<typeof CalculateCitizenStandingInputSchema>;
