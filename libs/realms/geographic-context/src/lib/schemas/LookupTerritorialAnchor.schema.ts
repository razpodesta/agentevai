/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchorSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para ancoragem territorial.
 */

import { z } from 'zod';

/**
 * @name LookupTerritorialAnchorInputSchema
 * @description Aduana de entrada estrita para rastro de rede.
 */
export const LookupTerritorialAnchorInputSchema = z.object({
  internetProtocolAddress: z.ipv4()
    .describe('Endereço IP do visitante para geofencing e rastro de soberania.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'LookupTerritorialAnchorInput'>()
.readonly();

export type ILookupTerritorialAnchorInput = z.infer<typeof LookupTerritorialAnchorInputSchema>;