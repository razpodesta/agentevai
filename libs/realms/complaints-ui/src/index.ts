/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ComplaintsUIHub
 * @version 1.0.0
 * @protocol OEDP-V5.5.2 - Flat Export
 * @description Ponto único de exposição para os aparatos de fiscalização cidadã.
 */

/* --- APARATO: PublicComplaintOrganism --- */
export { PublicComplaintOrganism } from './lib/public-complaint-organism/PublicComplaintOrganism.js';
export { 
  PublicComplaintOrganismInputSchema, 
  type IPublicComplaintOrganismInput,
  type ComplaintIdentifier,
  type ComplaintSeverity
} from './lib/public-complaint-organism/schemas/PublicComplaintOrganism.schema.js';