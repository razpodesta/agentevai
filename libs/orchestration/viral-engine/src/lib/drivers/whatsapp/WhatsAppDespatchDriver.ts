/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus WhatsAppDespatchDriver
 */

import { IViralCapsule } from '../../schemas/ViralContent.schema.js';

export const WhatsAppDespatchDriver = async (capsule: IViralCapsule): Promise<void> => {
  // Formatação Mobile-First: Título em negrito e link destacado
  const formattedMessage = `*🚨 AGENTE VAI: ${capsule.title.toUpperCase()}*\n\n${capsule.shareMessage}\n\n✅ Prova Blockchain: ${capsule.merkleRootProof.substring(0, 8)}\n\n🔗 *Acesse agora:* ${capsule.sourceUrl}`;

  // Codificação para Deep Link (wa.me)
  const encodedUrl = encodeURIComponent(formattedMessage);
  // O sistema então emite o intent: `whatsapp://send?text=${encodedUrl}`
};
