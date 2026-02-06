Manifesto 0014: Atomicidade Funcional e Soberania de Aparatos
Autor: Raz Podestá - MetaShark Tech
Status: Vital / Em vigor
Nível: God Tier (Arquitetura de Fluxo Puro)
1. A Filosofia: "Um Aparato, Uma Função, Uma Verdade"
No Agentevai, o conceito de "Aparato" transcende o componente visual. Um aparato é uma Unidade Lógica Atômica. Para atingir a escalabilidade total e permitir que a IA de Autocura opere com precisão cirúrgica, aplicamos o Princípio da Responsabilidade Única (SRP) ao nível do átomo.
1.1. A Regra do Arquivo Único
Cada arquivo de lógica (.ts) ou interface (.tsx) deve exportar exclusivamente uma única função ou componente. Se uma lógica requer sub-funções, estas devem ser extraídas para seus próprios aparatos atômicos.
2. Anatomia de um Aparato Atômico (Standard OEDP-V5.5)
Todo aparato, sem exceção, deve ser entregue seguindo esta estrutura rigorosa:
Rota Relativa: Comentada na primeira linha.
Contratos de Interface: Interfaces de Entrada e Saída explicitamente declaradas (Zero Abreviaturas).
Validação de Fronteira: Uso de Zod para garantir que a função nunca processe lixo.
Observabilidade Nativa: Integração com o SovereignLogger.
Internacionalização Granular: Silo de i18n dedicado ao propósito da função.
TSDoc Pro: Metadata de autor, descrição e rastro forense.
3. Exemplo Prático: Aparato Atômico de Cálculo de Influência
Este exemplo demonstra como transformamos uma lógica de negócio em um aparato atômico pronto para produção.
// libs/realms/community-domain/src/lib/calculators/CalculateUserSocialInfluence.ts
code
TypeScript
/**
 * Raz Podestá - MetaShark Tech
 * Aparato: CalculateUserSocialInfluence
 * Descrição: Calcula o índice de influência de um cidadão baseado em apoios recebidos.
 * Rota Relativa: libs/realms/community-domain/src/lib/calculators/CalculateUserSocialInfluence.ts
 */

import { z } from 'zod';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';

/**
 * Interface para os parâmetros de entrada.
 * Regra: Sem abreviações (Zero Abbreviations).
 */
export interface CalculateUserSocialInfluenceParameters {
  readonly totalSupportCountReceived: number;
  readonly accountSeniorityInDays: number;
  readonly verificationMultiplier: number;
}

/**
 * Interface para o resultado do cálculo.
 */
export interface CalculateUserSocialInfluenceResult {
  readonly influenceScore: number;
  readonly eligibilityTier: 'GUEST' | 'ACTIVE_CITIZEN' | 'INFLUENCER' | 'AMBASSADOR';
}

/**
 * Esquema de Validação de Integridade (Aduana do Átomo).
 */
const InputSchema = z.object({
  totalSupportCountReceived: z.number().min(0),
  accountSeniorityInDays: z.number().min(0),
  verificationMultiplier: z.number().min(1).max(5),
});

/**
 * @name CalculateUserSocialInfluence
 * @function
 * @description Executa o algoritmo atômico de pontuação social do cidadão.
 */
export const CalculateUserSocialInfluence = async (
  parameters: CalculateUserSocialInfluenceParameters
): Promise<CalculateUserSocialInfluenceResult> => {
  const apparatusName = 'CalculateUserSocialInfluence';

  // 1. Validação de Integridade
  const validation = InputSchema.safeParse(parameters);
  
  if (!validation.success) {
    throw new SovereignError({
      uniqueErrorCode: 'OS-APP-7001',
      severity: 'HIGH',
      apparatusMetadata: {
        name: apparatusName,
        version: '1.0.0',
        fileLocation: 'libs/realms/community-domain/src/lib/calculators/CalculateUserSocialInfluence.ts'
      },
      runtimeSnapshot: {
        inputPayload: parameters,
        systemState: { timestamp: new Date().toISOString() }
      }
    });
  }

  // 2. Lógica Atômica Pura
  const { totalSupportCountReceived, accountSeniorityInDays, verificationMultiplier } = parameters;
  
  const baseScore = (totalSupportCountReceived * 10) + (accountSeniorityInDays * 0.5);
  const finalInfluenceScore = baseScore * verificationMultiplier;

  let tier: CalculateUserSocialInfluenceResult['eligibilityTier'] = 'GUEST';
  if (finalInfluenceScore > 5000) tier = 'AMBASSADOR';
  else if (finalInfluenceScore > 1000) tier = 'INFLUENCER';
  else if (finalInfluenceScore > 100) tier = 'ACTIVE_CITIZEN';

  // 3. Telemetria Soberana
  SovereignLogger.logNeuralActivity({
    model: 'ALGORITHMIC_ATOMIC_CALCULATOR',
    tokens: 0,
    costUsd: 0,
    latency: 1.2, // ms
    isVocalized: false
  });

  return {
    influenceScore: finalInfluenceScore,
    eligibilityTier: tier
  };
};
4. O "Barril" (The Composition Layer)
Para consumir esses átomos de forma organizada, utilizamos o Barril no arquivo index.ts da biblioteca. Isso permite que outros desenvolvedores importem as peças de Lego de forma limpa.
// libs/realms/community-domain/src/index.ts
code
TypeScript
/**
 * Raz Podestá - MetaShark Tech
 * Barril de Composição: Community Domain
 * Responsabilidade: Expor os átomos do domínio de comunidade.
 */

export * from './lib/calculators/CalculateUserSocialInfluence';
export * from './lib/validators/ValidateComplaintEvidence';
export * from './lib/formatters/FormatRegionalDate';
5. Auditoria de Elite: O que a IA deve observar?
A IA de Autocura (AI-Neural-Auditor) deve invalidar qualquer aparato que:
Contenha mais de uma função exportada.
Utilize abreviações como params, req, res, id.
Não possua o rastro do SovereignLogger ou SovereignError.
Não tenha um contrato Zod protegendo a entrada.

---

ADENDUM
Atomicidade Funcional e Soberania de Aparatos
Autor: Raz Podestá - MetaShark Tech
Status: Vital / Em vigor
Nível: God Tier (Arquitetura de Fluxo Puro)
1. A Filosofia: "Um Aparato, Uma Função, Uma Verdade"
No ecossistema Agentevai, um "Aparato" não é apenas um componente visual, mas uma Unidade Lógica Atômica. Para permitir que a IA de Autocura opere com precisão cirúrgica, pulverizamos a complexidade em funções inquebráveis que respeitam o Princípio da Responsabilidade Única (SRP).
1.1. A Regra do Arquivo Único
Cada arquivo de lógica (.ts) ou interface (.tsx) deve exportar exclusivamente uma única função ou componente. Sub-lógicas devem ser extraídas para seus próprios aparatos atômicos.
2. Anatomia de um Aparato Atômico (Standard OEDP-V5.5)
Todo aparato deve ser entregue seguindo esta estrutura de arquivos obrigatória:
A Lógica (ApparatusName.ts/tsx): A execução pura.
O Contrato (schemas/ApparatusName.schema.ts): Validação Zod (Zero-Any Policy).
A alma Linguística (i18n/pt/ApparatusName.pt.schema.json): Dicionário granular em Português.
3. Exemplo Prático de Fabricação (God Tier)
Este exemplo demonstra como transformamos uma regra de negócio em um aparato atômico completo.
📄 Arquivo 1: Lógica Atômica
// libs/realms/community-domain/src/lib/calculators/CalculateUserSocialInfluence.ts
code
TypeScript
/**
 * Raz Podestá - MetaShark Tech
 * Aparato: CalculateUserSocialInfluence
 * Rota Relativa: libs/realms/community-domain/src/lib/calculators/CalculateUserSocialInfluence.ts
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { CalculateUserSocialInfluenceSchema, ICalculateUserSocialInfluence } from './schemas/CalculateUserSocialInfluence.schema';

export const CalculateUserSocialInfluence = async (
  parameters: ICalculateUserSocialInfluence
): Promise<number> => {
  // 1. Validação de Fronteira
  const data = CalculateUserSocialInfluenceSchema.parse(parameters);
  
  // 2. Execução (Responsabilidade Única)
  const score = (data.supportCount * 10) + (data.daysActive * 0.5);

  // 3. Telemetria
  SovereignLogger.logNeuralActivity({ model: 'ALGO_V1', tokens: 0, costUsd: 0, latency: 0.5, isVocalized: false });

  return score;
};
📄 Arquivo 2: Esquema Granular (ADN)
// libs/realms/community-domain/src/lib/calculators/schemas/CalculateUserSocialInfluence.schema.ts
code
TypeScript
import { z } from 'zod';

export const CalculateUserSocialInfluenceSchema = z.object({
  supportCount: z.number().nonnegative(),
  daysActive: z.number().positive(),
}).readonly();

export type ICalculateUserSocialInfluence = z.infer<typeof CalculateUserSocialInfluenceSchema>;
📄 Arquivo 3: Dicionário em Português (Soberania)
// libs/realms/community-domain/src/lib/calculators/i18n/pt/CalculateUserSocialInfluence.pt.schema.json
code
JSON
{
  "CalculateUserSocialInfluence": {
    "errorInvalidInput": "Os dados de influência social fornecidos são inconsistentes.",
    "logAuditMessage": "Cálculo de influência processado pelo motor atômico."
  }
}
4. Adendo: Sincronia de ADN e Linguagem
Fica estabelecido que:
Contrato Zod: É a "Aduana do Átomo". Nenhuma função atômica deve aceitar dados sem passar pelo seu respectivo arquivo .schema.ts. Isso permite que a IA identifique instantaneamente onde o dado "sangrou".
Dicionário JSON: Cada aparato é dono da sua própria tradução. O internationalization-engine irá varrer essas pastas e unir os JSONs. O arquivo deve conter o sufixo .pt.schema.json para ser processado pelo script de build.
5. Auditoria de Elite
A IA de Autocura (AI-Neural-Auditor) invalidará aparatos que:
Misturem lógica de múltiplos domínios em um arquivo.
Não possuam a pasta schemas/ com o Zod correspondente.
Não possuam o arquivo de internacionalização em Português.
Utilizem qualquer forma de abreviação (msg, id, val).

---