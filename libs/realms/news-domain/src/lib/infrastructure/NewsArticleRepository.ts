/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleRepository
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - High Performance Infrastructure
 * @description Repositório para gestão física e persistência de artigos no Reino de Notícias.
 * Atua como o braço executor do Supabase com selagem de ADN em cada transação.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  NewsArticleSchema, 
  type INewsArticle 
} from './schemas/NewsArticle.schema.js';

/**
 * @class NewsArticleRepository
 * @description Orquestrador de persistência regional. 
 * O construtor é privado para manter a integridade do rastro via métodos estáticos.
 */
export class NewsArticleRepository {
  private static readonly apparatusName = 'NewsArticleRepository';
  private static clientInstance: SupabaseClient | null = null;

  private constructor() {
    // Acesso negado: Utilizar métodos de soberania estáticos.
  }

  /**
   * @method getSovereignInfrastructureClient
   * @private singleton para orquestração de conexões.
   */
  private static getSovereignInfrastructureClient(): SupabaseClient {
    if (this.clientInstance) return this.clientInstance;

    const endpointUrl = process.env['SUPABASE_URL'];
    const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

    if (!endpointUrl || !serviceRoleKey) {
      throw new Error('MISSING_NEWS_INFRASTRUCTURE_ENVIRONMENT_KEYS');
    }

    this.clientInstance = createClient(endpointUrl, serviceRoleKey);
    return this.clientInstance;
  }

  /**
   * @method sealNewsArticleInVault
   * @async
   * @description Realiza a gravação física e inalterável de uma notícia no cofre relacional.
   * 
   * @param {INewsArticle} newsArticle - Objeto de notícia validado pelo ADN.
   * @returns {Promise<void>}
   */
  public static async sealNewsArticleInVault(newsArticle: INewsArticle): Promise<void> {
    const fileLocation = 'libs/realms/news-domain/src/lib/infrastructure/NewsArticleRepository.ts';

    try {
      // 1. Validação de Integridade (Aduana de Saída)
      const validatedNewsArticle = NewsArticleSchema.parse(newsArticle);
      const supabase = this.getSovereignInfrastructureClient();

      // 2. Execução de Persistência (Mapeamento para esquema SQL)
      const { error: databaseError } = await supabase
        .from('agv_news_articles')
        .insert([{
          identifier: validatedNewsArticle.identifier,
          author_identifier: validatedNewsArticle.authorIdentifier,
          title: validatedNewsArticle.title,
          body_content: validatedNewsArticle.content,
          excerpt: validatedNewsArticle.excerpt,
          category_type: validatedNewsArticle.category,
          editorial_status: validatedNewsArticle.editorialStatus,
          regional_slug: validatedNewsArticle.regionalSlug,
          blockchain_merkle_root: validatedNewsArticle.merkleRootAnchor,
          correlation_identifier: validatedNewsArticle.correlationIdentifier,
          updated_at: new Date().toISOString()
        }]);

      if (databaseError) throw databaseError;

      // 3. Telemetria de Sucesso
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_VAULTED',
        message: `Artigo [${validatedNewsArticle.identifier}] persistido com sucesso.`,
        traceIdentifier: validatedNewsArticle.correlationIdentifier
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INF-3001'),
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier: newsArticle?.correlationIdentifier || 'NO_TRACE',
        severity: 'HIGH'
      });
    }
  }

  /**
   * @method transmuteEditorialStatus
   * @async
   * @description Atualiza exclusivamente o estágio do workflow editorial.
   */
  public static async transmuteEditorialStatus(
    newsArticleIdentifier: string,
    targetEditorialStatus: string,
    correlationIdentifier: string
  ): Promise<void> {
    const supabase = this.getSovereignInfrastructureClient();

    const { error: updateError } = await supabase
      .from('agv_news_articles')
      .update({ 
        editorial_status: targetEditorialStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('identifier', newsArticleIdentifier);

    if (updateError) {
      SovereignLogger({
        severity: 'CRITICAL',
        apparatus: this.apparatusName,
        operation: 'STATE_TRANSMUTATION_FAILURE',
        message: `Incapacidade técnica de transmutar artigo ${newsArticleIdentifier} para ${targetEditorialStatus}.`,
        traceIdentifier: correlationIdentifier
      });
      throw updateError;
    }
  }
}