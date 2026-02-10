/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSupabaseClient
 * @version 1.1.0
 * @protocol OEDP-V6.0
 * @description Singleton de infraestrutura. Saneado contra TS2307.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export class SovereignSupabaseClient {
  private static clientInstance: SupabaseClient | null = null;

  public static getInstance(): SupabaseClient {
    if (this.clientInstance) return this.clientInstance;

    const supabaseUrl = process.env['SUPABASE_URL'];
    const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('SUPABASE_BRIDGE_KEYS_MISSING');
    }

    /**
     * @section Configuração de Elite
     * Desativamos persistência de sessão para contextos de integração pura.
     */
    this.clientInstance = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    });

    return this.clientInstance;
  }
}
