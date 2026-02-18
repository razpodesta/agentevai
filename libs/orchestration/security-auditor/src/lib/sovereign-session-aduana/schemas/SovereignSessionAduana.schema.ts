/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSessionAduanaSchema
 * @version 7.8.0
 * @protocol OEDP-V7.0 - Master DNA Zenith
 * @description ADN de elite para selagem de estado de sessão em Edge Runtime.
 */

import { z } from 'zod';
import { EncryptedDataSchema } from '@agentevai/sovereign-data-vault';

/**
 * @name SovereignSessionAduanaInputSchema
 * @description Única Fonte de Verdade para o rastro de sessão recuperado via cookies.
 */
export const SovereignSessionAduanaInputSchema = z.object({
  isUserAuthenticated: z.boolean()
    .describe('Sinalizador de presença de rastro de autenticação ativo.'),

  hasStoredConsciousness: z.boolean()
    .describe('Indica se o território e preferências foram localizados no búnquer de cookies.'),

  /** Dados cifrados recuperados do cofre de geolocalização. */
  vaultedGeospatialData: EncryptedDataSchema.optional()
    .describe('Carga criptografada contendo o rastro territorial do cidadão.'),

  /** Identificador Zenith para correlação total do rastro forense. */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense gerado na borda.')
})
.brand<'SovereignSessionAduanaInput'>()
.readonly();

export type ISovereignSessionAduanaInput = z.infer<typeof SovereignSessionAduanaInputSchema>;