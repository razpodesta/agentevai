/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeospatialTruth.schema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para representação da hierarquia de veracidade geográfica.
 * Implementa Uniões Discriminadas para garantir que a IA trate cada nível de fidelidade com rigor.
 */

import { z } from 'zod';
import { HighFidelityLocationSchema } from '@agentevai/ui-kit-atoms';
import { H3IndexSchema } from '../../../geography-infrastructure/src/lib/logic/schemas/ExecuteProximityQuery.schema.js';

/** 
 * @name GeospatialTruthSchema 
 * @description Única Fonte de Verdade para o rastro de localização.
 */
export const GeospatialTruthSchema = z.discriminatedUnion('fidelityLevel', [
  /** NÍVEL ZENITH (IAL3): GPS de hardware validado com indexação H3 */
  z.object({
    fidelityLevel: z.literal('IAL3_SOVEREIGN'),
    location: HighFidelityLocationSchema,
    hexagonalIndex: H3IndexSchema,
    humanizedAddress: z.string().min(5).describe('Endereço textual via Nominatim/OSM.'),
  }),
  
  /** NÍVEL INFRAESTRUTURA (IAL2): Ancoragem via rastro de IP (IP-API) */
  z.object({
    fidelityLevel: z.literal('IAL2_VERIFIED'),
    internetProtocolAddress: z.string().ip(),
    regionName: z.string().describe('Cidade detectada pelo provedor de rede.'),
    stateCode: z.string().length(2).toUpperCase(),
  }),

  /** NÍVEL VOLUNTÁRIO (IAL1): Escolha manual ou ruteamento de fallback */
  z.object({
    fidelityLevel: z.literal('IAL1_ESTIMATED'),
    manualLocationName: z.string(),
  })
]).readonly();

export type IGeospatialTruth = z.infer<typeof GeospatialTruthSchema>;