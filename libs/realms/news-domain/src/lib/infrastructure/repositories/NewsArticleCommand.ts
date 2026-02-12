/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleCommand
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Fidelity Persistence
 * @description Unidade atômica de escrita. Saneamento de rastro e correção de importação.
 * @policy ZERO-ABBREVIATIONS: Erradicação absoluta de abreviações técnicas.
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

/** 
 * @section CURA_TS2307 
 * Acesso via Ponte de Integração (Sovereign Bridge) para respeitar as fronteiras do Monorepo.
 */
import { SovereignSupabaseClient } from '@agentevai/supabase-bridge';
import { NewsArticleSchema, type INewsArticle } from '../schemas/NewsArticle.schema.js';

/**
 * @section Mapeamento de Persistência (PostgreSQL Physical Schema)
 */
const DATABASE_COLUMNS = {
  PRIMARY_KEY: 'identifier',
  AUTHOR_TRACE: 'author_identifier',
  EDITORIAL_CONTENT: 'body_content',
  IMMUTABILITY_ROOT: 'merkle_root',
  CORRELATION_TRACE: 'correlation_identifier'
} as const;

export class NewsArticleCommand {
  private static readonly apparatusName = 'NewsArticleCommand';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/infrastructure/repositories/NewsArticleCommand.ts';

  /**
   * @method sealArticleInVault
   * @async
   * @description Realiza a gravação física no cofre relacional com telemetria poliglota.
   */
  public static async sealArticleInVault(
    newsArticle: INewsArticle,
    dictionary: ISovereignDictionary
  ): Promise<void> {
    const apparatusName = this.apparatusName;
    
    // 1. ADUANA DE ADN (Garante integridade estrutural)
    const validatedData = NewsArticleSchema.parse(newsArticle);
    const { correlationIdentifier } = validatedData;

    // Pilar 5: Soberania Linguística
    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    try {
      const supabase = SovereignSupabaseClient.getClient();

      // 2. EXECUÇÃO DE PERSISTÊNCIA (Mapeamento Nominal)
      const { error: databaseError } = await supabase
        .from('agv_news_articles')
        .insert([{
          [DATABASE_COLUMNS.PRIMARY_KEY]: validatedData.identifier,
          [DATABASE_COLUMNS.AUTHOR_TRACE]: validatedData.authorIdentifier,
          title: validatedData.title,
          [DATABASE_COLUMNS.EDITORIAL_CONTENT]: validatedData.content,
          excerpt: validatedData.excerpt,
          category_type: validatedData.category,
          editorial_status: validatedData.editorialStatus,
          regional_slug: validatedData.regionalSlug,
          country_code: validatedData.countryCode,
          [DATABASE_COLUMNS.IMMUTABILITY_ROOT]: validatedData.merkleRootAnchor,
          [DATABASE_COLUMNS.CORRELATION_TRACE]: validatedData.correlationIdentifier,
          updated_at: validatedData.updatedAt
        }]);

      if (databaseError) throw databaseError;

      // 3. TELEMETRIA DE SUCESSO (Cura de Dívida Semântica)
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_SEALED',
        message: translate('logArticleSealed', { identifier: validatedData.identifier }),
        correlationIdentifier
      });

    } catch (caughtError) {
      /** 
       * @section CURA_ESLINT_UNUSED 
       * Invocamos o SovereignErrorCodeSchema para validar o código da falha, 
       * garantindo que a importação seja utilitária e não radiação.
       */
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INF-3001'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}