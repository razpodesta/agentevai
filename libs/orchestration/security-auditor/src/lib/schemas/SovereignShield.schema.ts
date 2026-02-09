/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignShieldSchema
 * @version 1.2.2
 * @protocol OEDP-V5.5 - Zero Any Policy
 * @description Define o ADN de reputação e ameaça para identidades de rede.
 * Sincronizado com Zod v4: Uso do construtor atômico z.ipv4().
 */

import { z } from 'zod';

/**
 * @section Taxonomia de Ameaça
 */
export const ThreatLevelSchema = z.enum(['LOW', 'ELEVATED', 'CRITICAL', 'BLACKLISTED'])
  .describe('Categorização semântica do nível de perigo detectado para este rastro de rede.');

/**
 * @name SovereignShieldSchema
 * @description Única Fonte de Verdade para assinaturas de segurança de IP.
 */
export const SovereignShieldSchema = z.object({
  /**
   * @section Sincronia de Borda (Zod v4 Elite)
   * Validação de IP delegada ao construtor de primeira classe.
   */
  address: z.ipv4()
    .describe('Endereço de Protocolo de Internet (IPv4) validado da origem da requisição.'),

  reputationScore: z.number()
    .min(0)
    .max(100)
    .describe('Índice de confiabilidade calculado pela IA baseado no histórico do rastro.'),

  lastActivity: z.string()
    .datetime()
    .describe('Marca temporal ISO-8601 do último pulso detectado na infraestrutura.'),

  requestCountInWindow: z.number()
    .nonnegative()
    .describe('Volume de petições registradas na janela de monitoramento ativa.'),

  isBot: z.boolean()
    .describe('Sinalizador booleano de detecção de agentes automatizados.'),

  threatLevel: ThreatLevelSchema,
}).readonly();

export type ISovereignShield = z.infer<typeof SovereignShieldSchema>;
