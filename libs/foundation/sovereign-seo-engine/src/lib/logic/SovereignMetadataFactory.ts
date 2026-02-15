/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMetadataFactory
 * @version 1.1.0
 * @protocol OEDP-V6.5 - High Performance Indexing
 * @description Fábrica atômica que transmuta ADN de Reino em metadados.
 * CURADO: Erradicado TS2339 via sincronia com o ADN Zenith.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  MetadataPacketSchema, 
  type IMetadataPacket 
} from '../schemas/SovereignSEO.schema.js';

export class SovereignMetadataFactory {
  private static readonly apparatusName = 'SovereignMetadataFactory';

  /**
   * @method generateNextMetadata
   * @description Converte o pacote soberano para a Metadata API do Next.js 16.
   */
  public static generateNextMetadata(parametersInput: unknown): object {
    // 1. ADUANA DE ADN (Cura TS2339: O tipo agora porta forensicProof e openGraph)
    const validatedData: IMetadataPacket = MetadataPacketSchema.parse(parametersInput);

    // 2. TELEMETRIA DE SINCRO
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'METADATA_SEALED',
      message: `Rastro de autoridade gerado para: ${validatedData.titleHeader}`,
      correlationIdentifier: validatedData.correlationIdentifier,
      metadata: { assuranceLevel: validatedData.forensicProof.assuranceLevel }
    });

    return {
      title: validatedData.titleHeader,
      description: validatedData.descriptionNarrative,
      alternates: {
        canonical: validatedAddress(validatedData.canonicalUniversalResourceLocator),
      },
      openGraph: {
        title: validatedData.titleHeader,
        description: validatedData.descriptionNarrative,
        url: validatedData.canonicalUniversalResourceLocator,
        siteName: validatedData.openGraph.siteName,
        images: [{ url: validatedData.openGraph.imageResourceUrl }],
        locale: validatedData.openGraph.localeCode,
        type: validatedData.openGraph.resourceType,
      },
      twitter: {
        card: 'summary_large_image',
        title: validatedData.titleHeader,
        description: validatedData.descriptionNarrative,
        images: [validatedData.openGraph.imageResourceUrl],
      },
      other: {
        'agv-merkle-root': validatedData.forensicProof.merkleRootHash || '',
        'agv-assurance-level': validatedData.forensicProof.assuranceLevel
      }
    };
  }
}

function validatedAddress(universalResourceLocator: string): string {
  return universalResourceLocator;
}