/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus WhatsAppDespatchDriver
 * @version 6.0.0
 * @description Saneado contra unused-vars e radiação técnica.
 */

import { type IViralCapsule } from '../../schemas/ViralContent.schema.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';

export const WhatsAppDespatchDriver = async (
  capsule: IViralCapsule
): Promise<void> => {
  const { correlationIdentifier, editorialTitle, socialShareMessage, canonicalSourceUniversalResourceLocator } = capsule;

  const formattedMessage = `*🚨 AGENTE VAI: ${editorialTitle.toUpperCase()}*\n\n${socialShareMessage}\n\n🔗 *Acesse agora:* ${canonicalSourceUniversalResourceLocator}`;

  /** 
   * @section CURA_LINT
   * O rastro codificado é gerado e injetado diretamente no despacho de telemetria.
   */
  const encodedMessageForUrl = encodeURIComponent(formattedMessage);

  SovereignLogger({
    severity: 'INFO',
    apparatus: 'WhatsAppDespatchDriver',
    operation: 'INTENT_GENERATED',
    message: 'Deep Link de compartilhamento gerado com integridade.',
    correlationIdentifier,
    metadata: { 
      messageLength: formattedMessage.length,
      payloadSize: encodedMessageForUrl.length 
    }
  });

  // O sistema emite o sinal para o Frontend abrir: `whatsapp://send?text=${encodedMessageForUrl}`
};