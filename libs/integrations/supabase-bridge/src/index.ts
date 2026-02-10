/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SupabaseBridgeGate
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Export Sovereignty
 * @description Ponto único de exposição para o Reino de Persistência.
 */

/* --- 🏛️ INFRAESTRUTURA --- */
export { SovereignSupabaseClient } from './lib/infrastructure/SovereignSupabaseClient.js';

/* --- 📦 REPOSITÓRIOS --- */
export { SecurityAuditRepository } from './lib/repositories/SecurityAuditRepository.js';

/* --- 🔌 DRIVERS --- */
export { UserAgentCollectorDriver } from './lib/drivers/UserAgentCollectorDriver.js';

/* --- 🧬 ADN (SCHEMAS) --- */
export * from './lib/schemas/SecurityAudit.schema.js';
export * from './lib/schemas/UserAgentCollector.schema.js';
