/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleRepository
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Performance Integration
 * @description Repositório para gestão física de notícias.
 * Erradica radiação técnica via selagem Zod em cada transação.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { NewsArticleSchema, type INewsArticle } from './schemas/NewsArticle.schema.js';

/**
 * @class NewsArticleRepository
 * @description Orquestrador de persistência para o Reino de Notícias.
 */
export class NewsArticleRepository {
  private static readonly apparatusName = 'NewsArticleRepository';
  private static clientInstance: SupabaseClient | null = null;

  /**
   * @method getInfrastructureClient
   * @private Singleton para evitar leak de sockets.
   */
  private static getInfrastructureClient(): SupabaseClient {
    if (this.clientInstance) return this.clientInstance;

    const url = process.env['SUPABASE_URL'] || '';
    const key = process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';

    if (!url || !key) throw new Error('MISSING_NEWS_INFRASTRUCTURE_KEYS');

    this.clientInstance = createClient(url, key);
    return this.clientInstance;
  }

  /**
   * @method persistNewArticle
   * @description Sela um rascunho ou notícia no cofre relacional.
   */
  public static async persistNewArticle(article: INewsArticle): Promise<void> {
    const fileLocation = 'libs/realms/news-domain/src/lib/infrastructure/NewsArticleRepository.ts';

    try {
      const validatedArticle = NewsArticleSchema.parse(article);
      const supabase = this.getInfrastructureClient();

      const { error } = await supabase
        .from('agv_news_articles')
        .insert([{
          id: validatedArticle.identifier,
          author_id: validatedArticle.authorIdentifier,
          title: validatedArticle.title,
          body_content: validatedArticle.content,
          excerpt: validatedArticle.excerpt,
          category_type: validatedArticle.category,
          current_state: validatedArticle.editorialStatus,
          region_slug: validatedArticle.regionalSlug,
          blockchain_root: validatedArticle.merkleRootAnchor,
          correlation_id: validatedArticle.correlationIdentifier,
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_PERSISTED',
        message: `Artigo ${validatedArticle.identifier} selado no Reino de Notícias.`,
        traceIdentifier: validatedArticle.correlationIdentifier
      });

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-INF-3001',
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier: article?.correlationIdentifier || 'NO_TRACE',
        severity: 'HIGH'
      });
    }
  }

  /**
   * @method updateArticleState
   * @description Atualiza exclusivamente o estágio do workflow editorial.
   */
  public static async updateArticleState(
    identifier: string,
    nextState: string,
    correlationIdentifier: string
  ): Promise<void> {
    const supabase = this.getInfrastructureClient();

    const { error } = await supabase
      .from('agv_news_articles')
      .update({ current_state: nextState, updated_at: new Date().toISOString() })
      .eq('id', identifier);

    if (error) {
      SovereignLogger({
        severity: 'CRITICAL',
        apparatus: this.apparatusName,
        operation: 'STATE_UPDATE_FAILURE',
        message: `Falha ao transmutar estado do artigo ${identifier} para ${nextState}.`,
        traceIdentifier: correlationIdentifier
      });
      throw error;
    }
  }
}
