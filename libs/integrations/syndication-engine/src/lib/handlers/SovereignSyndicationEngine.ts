/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSyndicationEngine
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Fidelity Integration
 * @description Motor que transmuta coleções de notícias em rastro XML universal.
 * Implementa injeção de namespaces customizados para metadados forenses.
 */

import RSS from 'rss';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import { 
  SyndicationFeedInputSchema, 
  SyndicationXmlRastroSchema,
  type ISyndicationFeedInput, 
  type SyndicationXmlRastro 
} from '../schemas/Syndication.schema.js';

export class SovereignSyndicationEngine {
  private static readonly apparatusName = 'SovereignSyndicationEngine';

  /**
   * @method generateSovereignXmlFeed
   * @static
   * @description Orquestra a construção do documento XML com selagem de imutabilidade.
   * 
   * @param {ISyndicationFeedInput} parameters - O ADN de entrada contendo rastro e dados.
   * @returns {SyndicationXmlRastro} XML purificado e validado.
   */
  public static generateSovereignXmlFeed(
    parameters: ISyndicationFeedInput
  ): SyndicationXmlRastro {
    // 1. ADUANA DE ADN (Garante integridade estrutural)
    const data = SyndicationFeedInputSchema.parse(parameters);
    const { channelMetadata, articles, dictionary, correlationIdentifier } = data;

    // 2. CONFIGURAÇÃO DO CANAL SOBERANO
    const feedOrchestrator = new RSS({
      title: channelMetadata.title,
      description: channelMetadata.description,
      feed_url: channelMetadata.feedUniversalResourceLocator,
      site_url: channelMetadata.siteUniversalResourceLocator,
      language: channelMetadata.activeLocale,
      pubDate: new Date().toUTCString(),
      /** @section Namespace_Soberania */
      custom_namespaces: {
        'agv': 'https://agentevai.com.br/schema/syndication/1.0'
      }
    });

    // 3. INJEÇÃO DE ITENS (Rastro de Fatos)
    articles.forEach((article) => {
      feedOrchestrator.item({
        title: article.title,
        description: article.excerpt,
        url: `${channelMetadata.siteUniversalResourceLocator}/noticia/${article.identifier}`,
        author: article.authorName,
        date: article.publishedAt,
        categories: [article.categoryLabel],
        custom_elements: [
          { 'agv:merkleRootAnchor': article.merkleRootAnchor || 'NOT_YET_SEALED' },
          { 'agv:forensicIdentifier': article.identifier }
        ]
      });
    });

    // 4. TELEMETRIA DE SUCESSO
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'FEED_SYNDICATION_SUCCESS',
      message: SovereignTranslationEngine.translate(
        dictionary as unknown as ISovereignDictionary,
        this.apparatusName,
        'logFeedGenerated',
        { count: articles.length, country: channelMetadata.countryCode },
        correlationIdentifier
      ),
      correlationIdentifier
    });

    return SyndicationXmlRastroSchema.parse(feedOrchestrator.xml({ indent: true }));
  }
}