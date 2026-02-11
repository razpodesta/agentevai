/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchorSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para ancoragem territorial e perícia de rede.
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

/**
 * @name ExternalGeographicPulseSchema
 * @description ADN para validação do rastro bruto vindo de provedores externos.
 */
export const ExternalGeographicPulseSchema = z.object({
  country_code: z.string().length(2).optional(),
  country_name: z.string().optional(),
  region_code: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
}).loose().readonly();

export type ILookupTerritorialAnchorInput = z.infer<typeof LookupTerritorialAnchorInputSchema>;
export type IExternalGeographicPulse = z.infer<typeof ExternalGeographicPulseSchema>;