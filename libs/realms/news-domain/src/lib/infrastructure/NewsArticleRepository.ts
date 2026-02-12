/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleRepository
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance Facade
 * @description Orquestrador de persistência regional. 
 * CURA TS2353: Unificação de rastro via correlationIdentifier.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral exaustiva.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { SovereignSupabaseClient } from '@agentevai/supabase-bridge';

/** @section Sincronia de ADN */
import { NewsArticleSchema, type INewsArticle } from './schemas/NewsArticle.schema.js';

export class NewsArticleRepository {
  private static readonly apparatusName = 'NewsArticleRepository';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/infrastructure/NewsArticleRepository.ts';

  /**
   * @method sealNewsArticleInVault
   * @async
   * @description Realiza a gravação física de um rastro editorial no cofre relacional.
   */
  public static async sealNewsArticleInVault(
    newsArticle: INewsArticle,
    dictionary: ISovereignDictionary
  ): Promise<void> {
    const apparatusName = this.apparatusName;
    const validatedData = NewsArticleSchema.parse(newsArticle);
    const { correlationIdentifier } = validatedData;

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    try {
      const supabase = SovereignSupabaseClient.getClient();

      const { error: databaseError } = await supabase
        .from('agv_news_articles')
        .insert([{
          identifier: validatedData.identifier,
          author_identifier: validatedData.authorIdentifier,
          title: validatedData.title,
          body_content: validatedData.content,
          excerpt: validatedData.excerpt,
          category_type: validatedData.category,
          editorial_status: validatedData.editorialStatus,
          regional_slug: validatedData.regionalSlug,
          country_code: validatedData.countryCode,
          merkle_root: validatedData.merkleRootAnchor,
          correlation_identifier: correlationIdentifier,
          updated_at: validatedData.updatedAt
        }]);

      if (databaseError) throw databaseError;

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_SEALED',
        message: translate('logArticleSealed', { identifier: validatedData.identifier }),
        correlationIdentifier // CURA TS2353
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INF-3001'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }

  /**
   * @method transmuteEditorialStatus
   * @async
   * @description Atualiza o estágio do workflow editorial com auditoria forense.
   */
  public static async transmuteEditorialStatus(
    articleIdentifier: string,
    targetStatus: string,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<void> {
    const apparatusName = this.apparatusName;

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    try {
      const supabase = SovereignSupabaseClient.getClient();

      const { error: updateError } = await supabase
        .from('agv_news_articles')
        .update({ 
          editorial_status: targetStatus, 
          updated_at: new Date().toISOString() 
        })
        .eq('identifier', articleIdentifier);

      if (updateError) throw updateError;

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'STATE_TRANSMUTED',
        message: translate('logStatusEvolved', { identifier: articleIdentifier, status: targetStatus }),
        correlationIdentifier // CURA TS2353
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INF-3003'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'CRITICAL',
        recoverySuggestion: 'Verificar se o artigo existe no cofre ou se o status viola a Matriz de Transição.'
      });
    }
  }
}