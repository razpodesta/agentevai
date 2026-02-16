/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignGeospatialOrchestratorSchema
 * @version 2.0.0
 * @protocol OEDP-V6.5 - High Precision
 * @description ADN de orquestração para resolução da verdade geográfica (GPS vs IP).
 */

import { z } from 'zod';
import { HighFidelityLocationSchema } from '@agentevai/ui-kit-atoms';

/** 
 * @name SovereignGeospatialOrchestratorInputSchema 
 * @description Aduana de entrada para o motor de decisão territorial.
 */
export const SovereignGeospatialOrchestratorInputSchema = z.object({
  clientIpAddress: z.string().ip()
    .describe('Rastro de rede para fallback em caso de ausência de hardware.'),

  gpsPayload: HighFidelityLocationSchema.nullable()
    .describe('Carga de hardware validada IAL3.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.'),

  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Silo linguístico regionalizado.')
}).readonly();

export type ISovereignGeospatialOrchestratorInput = z.infer<typeof SovereignGeospatialOrchestratorInputSchema>;