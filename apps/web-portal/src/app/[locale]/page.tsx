/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignJournalPageIgnition
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Segment Authority
 * @description Ponto de entrada do segmento [locale]. 
 * CURA TS2307: Referências físicas sincronizadas com a Unidade Atômica.
 */

import { SovereignJournalPage } from './SovereignJournalPage/index.js';
import { SovereignJournalPageInputSchema } from './SovereignJournalPage/SovereignJournalPage.schema.js';

/**
 * @name Page
 * @description Ponto de ignição do rastro editorial regionalizado.
 */
export default async function Page(properties: { params: Promise<{ locale: string }> }) {
  // 1. ADUANA DE ADN (Garante que o objeto de props respeita a marca nominal)
  const validatedInput = SovereignJournalPageInputSchema.parse(properties);

  // 2. DELEGAÇÃO SOBERANA
  return <SovereignJournalPage params={validatedInput.params} />;
}