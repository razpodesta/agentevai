/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchorSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5 - High Precision
 * @description Define o contrato de entrada para resolução de ancoragem territorial.
 */

import { z } from 'zod';

/**
 * @name LookupTerritorialAnchorInputSchema
 * @description Aduana para rastro de rede e correlação.
 */
export const LookupTerritorialAnchorInputSchema = z.object({
  /** Sincronia Zod v4: Uso do construtor de elite para IPv4 */
  internetProtocolAddress: z.ipv4()
    .describe('Endereço IP do visitante para geofencing.'),

  correlationIdentifier: z.uuid()
    .describe('UUID de jornada para rastro forense.'),
}).readonly();

export type ILookupTerritorialAnchorInput = z.infer<typeof LookupTerritorialAnchorInputSchema>;
