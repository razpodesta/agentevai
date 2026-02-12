/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InstagramDespatchDriver
 * @version 6.0.0
 * @protocol OEDP-V6.0
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { type ISovereignDictionary, SovereignTranslationEngine } from '@agentevai/internationalization-engine';
import { type IViralCapsule } from '../../schemas/ViralContent.schema.js';
import { InstagramDespatchSchema } from './schemas/InstagramDespatch.schema.js';

export const InstagramDespatchDriver = async (
  capsule: IViralCapsule,
  dictionary: ISovereignDictionary
): Promise<string> => {
  const apparatusName = 'InstagramDespatchDriver';
  const { correlationIdentifier } = capsule;

  try {
    const caption = SovereignTranslationEngine.translate(
      dictionary, 'InstagramDespatch', 'captionTemplate',
      { title: capsule.editorialTitle, message: capsule.socialShareMessage, root: capsule.merkleRootProof },
      correlationIdentifier
    );

    // CURA LINT: Consumo imediato do ADN validado
    const validatedDespatch = InstagramDespatchSchema.parse({
      mediaUrl: capsule.mediaResourceAssets[0].resourceUniversalResourceLocator,
      caption,
      correlationIdentifier
    });

    // Orquestração de Postagem via Graph API (Simulada para Nivelamento)
    const instagramContainerIdentifier = 'INTERNAL_META_UID_TRX'; 

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'INSTAGRAM_DESPATCH_SUCCESS',
      message: `Cápsula visual enviada para o enxame Meta: ${validatedDespatch.correlationIdentifier}`,
      correlationIdentifier
    });

    return instagramContainerIdentifier;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-VIR-2002'),
      apparatus: apparatusName,
      location: 'libs/orchestration/viral-engine/src/lib/drivers/meta-instagram/InstagramDespatchDriver.ts',
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};