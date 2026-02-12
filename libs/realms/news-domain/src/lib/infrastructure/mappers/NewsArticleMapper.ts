/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleMapper
 * @version 2.0.0
 * @description Transmuta rastro bruto do Supabase em ADN de Domínio. Zero Any Policy.
 */

import { NewsArticleSchema, type INewsArticle } from '../schemas/NewsArticle.schema.js';

export class NewsArticleMapper {
  /**
   * @method toDomain
   * @description Realiza a purificação do rastro técnico externo.
   */
  public static toDomain(rawTrace: unknown): INewsArticle {
    // Aplicamos o parse direto para garantir que o 'any' implícito do banco morra aqui.
    return NewsArticleSchema.parse(rawTrace);
  }
}