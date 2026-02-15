/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignStructuredDataEngine
 * @description Injeta Microdados Schema.org com selagem Blockchain.
 * CURADO: Erradicado TS2305 e aviso de variáveis não utilizadas.
 */

import { 
  JsonLdArticleSchema, 
  type IJsonLdArticle 
} from '../schemas/SovereignSEO.schema.js';

export class SovereignStructuredDataEngine {
  /**
   * @method generateNewsArticleSchema
   * @description Gera o bloco JSON-LD para notícias e denúncias verificadas.
   */
  public static generateNewsArticleSchema(parametersInput: unknown): string {
    // 1. ADUANA DE ADN (Cura ESLint unused-vars)
    const validatedData: IJsonLdArticle = JsonLdArticleSchema.parse(parametersInput);

    const schemaPayload = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": validatedData.headline,
      "datePublished": validatedData.datePublished,
      "dateModified": validatedData.dateModified,
      "author": { 
        "@type": "Person", 
        "name": validatedData.authorName 
      },
      "publisher": {
        "@type": "Organization",
        "name": validatedData.publisherName,
        "logo": { 
          "@type": "ImageObject", 
          "url": "https://agentevai.com.br/logo.png" 
        }
      },
      "contentLocation": { 
        "@type": "Place", 
        "name": validatedData.regionName 
      },
      "identifier": validatedData.merkleRootAnchor 
        ? `urn:agv:blockchain:${validatedData.merkleRootAnchor}` 
        : undefined
    };

    return JSON.stringify(schemaPayload);
  }
}