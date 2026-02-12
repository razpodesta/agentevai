/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleQuery
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance Reading
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignSupabaseClient } from '@agentevai/supabase-bridge';
import { type SovereignCountry } from '@agentevai/types-common';
import { NewsArticleMapper } from '../mappers/NewsArticleMapper.js';
import { type INewsArticle } from '../schemas/NewsArticle.schema.js';

export class NewsArticleQuery {
  private static readonly apparatusName = 'NewsArticleQuery';

  public static async fetchLatestPublishedByCountry(
    country: SovereignCountry,
    correlationIdentifier: string,
    limitCount = 20
  ): Promise<INewsArticle[]> {
    const supabase = SovereignSupabaseClient.getClient();

    try {
      const { data, error } = await supabase
        .from('agv_news_articles')
        .select('*')
        .eq('country_code', country)
        .eq('editorial_status', 'PUBLISHED')
        .order('updated_at', { ascending: false })
        .limit(limitCount);

      if (error) throw error;

      const evolvedArticles = (data || []).map(row => NewsArticleMapper.toDomain(row));

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'QUERY_SUCCESS',
        message: `Sincronia Editorial: ${evolvedArticles.length} notícias recuperadas.`,
        correlationIdentifier // Pilar VI: Unificação de Rastro
      });

      return evolvedArticles;

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INF-3002'),
        apparatus: this.apparatusName,
        location: 'libs/realms/news-domain/src/lib/infrastructure/repositories/NewsArticleQuery.ts',
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}