/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSupabaseClient
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance Persistence
 * @description Ponto de ignição mestre para o cliente Supabase. 
 * Implementa Singleton e orquestração de chaves de ambiente.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export class SovereignSupabaseClient {
  private static clientInstance: SupabaseClient | null = null;

  /**
   * @method getClient
   * @static
   * @description Resolve o handshake com o cofre relacional.
   */
  public static getClient(): SupabaseClient {
    if (this.clientInstance) return this.clientInstance;

    const endpointUrl = process.env['SUPABASE_URL'];
    const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

    if (!endpointUrl || !serviceRoleKey) {
      throw new Error('MISSING_SUPABASE_INFRASTRUCTURE_KEYS');
    }

    this.clientInstance = createClient(endpointUrl, serviceRoleKey);
    return this.clientInstance;
  }
}