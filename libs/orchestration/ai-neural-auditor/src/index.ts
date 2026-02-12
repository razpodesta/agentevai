/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiNeuralAuditorHub
 * @version 6.1.0
 * @protocol OEDP-V6.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Juiz Sistêmico.
 * CURA TS2305: Exportação formal de tipos e esquemas de veredito.
 */

/* --- 🧠 CAMADA OPERATIVA (HANDLERS) --- */
export { AuditSystemFailure } from './lib/AiNeuralAuditor.js';
export { ResolveMasterPrompt } from './lib/handlers/ResolveMasterPrompt.js';
export { NeuralProviderSelector } from './lib/handlers/NeuralProviderSelector.js';

/* --- 🧬 CAMADA DE ADN (SCHEMAS & TYPES) --- */
export {
  SystemAuditVerdictSchema,
  NeuralDiagnosisResultSchema,
  type ISystemAuditVerdict, // CURA: Exportação mandatória
} from './lib/schemas/AiNeuralAuditor.schema.js';

export {
  MasterPromptSchema,
  AuditorPersonaSchema,
  type IMasterPrompt
} from './lib/schemas/NeuralPromptRegistry.schema.js';