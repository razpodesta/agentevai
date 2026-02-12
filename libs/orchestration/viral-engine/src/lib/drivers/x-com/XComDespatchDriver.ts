/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus XComDespatchDriver
 * @version 6.1.0
 * @description Driver de elite saneado. Erradicado erro de 'id' e 'unused vars'.
 */

import { TwitterApi } from 'twitter-api-v2';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { type IViralCapsule } from '../../schemas/ViralContent.schema.js';
import { XComDespatchInputSchema } from './schemas/XComDespatch.schema.js';

export const XComDespatchDriver = async (
  capsule: IViralCapsule,
  dictionary: ISovereignDictionary
): Promise<string> => {
  const apparatusName = 'XComDespatchDriver';
  const { correlationIdentifier } = capsule;

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, 'XComDespatch', key, variables, correlationIdentifier
  );

  try {
    const finalStatusText = translate('statusTemplate', {
      message: capsule.socialShareMessage.substring(0, 200),
      root: capsule.merkleRootProof.substring(0, 12),
      url: capsule.canonicalSourceUniversalResourceLocator
    });

    const validatedDespatch = XComDespatchInputSchema.parse({
      statusText: finalStatusText,
      mediaResourceIdentifiers: [],
      correlationIdentifier
    });

    const twitterClient = new TwitterApi(process.env['X_API_BEARER_TOKEN'] || '');
    const tweetResponse = await twitterClient.v2.tweet(validatedDespatch.statusText);
    
    // CURA no-restricted-syntax: Mapeamento do 'id' externo para 'tweetIdentifier' soberano.
    const tweetIdentifier = tweetResponse.data.id;

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'X_DESPATCH_SUCCESS',
      message: translate('logDespatchSuccess', { tweetIdentifier }),
      correlationIdentifier,
      metadata: { tweetIdentifier, merkleRoot: capsule.merkleRootProof }
    });

    return tweetIdentifier;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-VIR-2001'),
      apparatus: apparatusName,
      location: 'libs/orchestration/viral-engine/src/lib/drivers/x-com/XComDespatchDriver.ts',
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};