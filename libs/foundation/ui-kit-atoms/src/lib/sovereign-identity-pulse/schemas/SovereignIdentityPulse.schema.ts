/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignIdentityPulseSchema
 * @version 1.1.0
 * @description Aduana de dados para validação de identidade regional e pulso de estado.
 * @policy Zero-Any Policy & Zero-Abbreviations.
 */

import { z } from 'zod';

export const SovereignIdentityPulseSchema = z.object({
  /** Nome amigável da cidade detectada via infraestrutura de Geofencing */
  cityName: z.string().min(2),
  /** Código soberano do país seguindo o padrão ISO 3166-1 alpha-2 */
  countryCode: z.enum(['br', 'es', 'us']),
  /** Gatilho semântico para estado de alerta máximo ou urgência na região */
  isCritical: z.boolean().default(false),
  /** Função de dispatch para eventos de interação do cidadão com o aparato */
  onInteraction: z.function().args(z.string()).returns(z.void()).optional(),
}).readonly();

/** Interface imutável extraída do Schema para tipagem de propriedades React */
export type ISovereignIdentityPulse = z.infer<typeof SovereignIdentityPulseSchema>;