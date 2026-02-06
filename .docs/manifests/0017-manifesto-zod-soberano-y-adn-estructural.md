Manifesto 0017: Zod Soberano e ADN Estrutural
Autor: Raz Podestá - MetaShark Tech
Status: Vital / Em vigor
Nível: God Tier (Validação Semântica)
1. A Filosofia: "Esquema como Única Fonte de Verdade (SSOT)"
No Agentevai, o Zod não é apenas um validador de formulários; ele é a Aduana de ADN. Todo dado que entra em um aparato (seja via API, User Input ou Props) deve ser "desnudado" e reconstruído pelo Zod. Se o ADN não coincide, o aparato nem sequer inicia sua execução.
2. Regras de Construção de Elite
Todo esquema Zod no projeto deve seguir estas diretrizes para extrair o máximo de inteligência:
2.1. Tipagem Nominal (Branded Types)
Para evitar a "obsessão por primitivos", usamos .brand<T>(). Isso impede que você passe um UserId onde o sistema espera um TenantId, mesmo que ambos sejam strings.
✅ const UserId = z.string().uuid().brand('UserId')
2.2. Injeção de Metadados para IA (.describe)
Todo campo deve possuir uma descrição técnica via .describe(). Isso permite que o AI-Neural-Auditor entenda a intenção do dado ao analisar um log de erro.
✅ email: z.string().email().describe('Endereço de comunicação oficial do cidadão')
2.3. Transformação Proativa
Use .transform() e .trim() para garantir que o dado saia da aduana pronto para o banco de dados ou lógica de negócio, respeitando o princípio DRY.
2.4. Erros Customizados e i18n
Nunca use as mensagens padrão do Zod. Utilize códigos de erro que mapeiam para nossos silos de i18n.
3. Convenção de Implementação (A Estrutura)
Todo arquivo de esquema deve residir na pasta schemas/ do seu respectivo aparato e exportar:
O Esquema (ApparatusNameSchema).
A Interface inferida (IApparatusName).
4. Exemplo "Nível Deus": Esquema de Denúncia Pública
// libs/realms/complaints-domain/src/lib/schemas/PublicComplaint.schema.ts
code
TypeScript
/**
 * Raz Podestá - MetaShark Tech
 * Aparato: PublicComplaintSchema
 * Descrição: O ADN mestre de uma denúncia pública no ecossistema Agentevai.
 * Rota Relativa: libs/realms/complaints-domain/src/lib/schemas/PublicComplaint.schema.ts
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const ComplaintIdSchema = z.string().uuid().brand<'ComplaintId'>();
export type ComplaintId = z.infer<typeof ComplaintIdSchema>;

/**
 * @name PublicComplaintSchema
 * @description Define a estrutura soberana de uma denúncia.
 */
export const PublicComplaintSchema = z.object({
  identifier: ComplaintIdSchema.describe('Identificador único inalterável da denúncia'),
  
  citizenId: z.string().min(5).describe('ID do cidadão autor (verificado via OAuth)'),
  
  title: z.string()
    .min(10, { message: 'COMPLAINT_TITLE_TOO_SHORT' })
    .max(150)
    .transform(val => val.toUpperCase())
    .describe('Título resumido da denúncia em caixa alta'),

  description: z.string()
    .min(50, { message: 'COMPLAINT_DESCRIPTION_INSUFFICIENT' })
    .describe('Relato detalhado do problema público identificado'),

  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    citySlug: z.string().describe('Slug da cidade para ruteamento geográfico')
  }).describe('Coordenadas físicas e identificador municipal'),

  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
    .default('MEDIUM')
    .describe('Nível de urgência para o triaje da IA e autoridades'),

  evidenceUrls: z.array(z.string().url())
    .min(1, { message: 'EVIDENCE_REQUIRED' })
    .describe('Lista de provas multimídia (fotos/vídeos)')

}).readonly(); // Imutabilidade forçada

/**
 * Interface inferida para uso em todo o projeto.
 */
export type IPublicComplaint = z.infer<typeof PublicComplaintSchema>;
5. Extraindo Inteligência do Esquema (A Convenção de Uso)
Para consumir o esquema nos aparatos, utilizamos o padrão Safe-Parsing para alimentar o nosso SovereignLogger:
code
TypeScript
const executeAduana = (data: unknown) => {
  const result = PublicComplaintSchema.safeParse(data);
  
  if (!result.success) {
    // A IA recebe os 'issues' do Zod e sabe exatamente qual campo falhou e porquê.
    SovereignError.capture({
      uniqueErrorCode: 'OS-VAL-1001',
      severity: 'CRITICAL',
      apparatusMetadata: { name: 'ComplaintAduana' },
      runtimeSnapshot: { 
        errors: result.error.flatten(), // Extrai inteligência do Zod
        inputPayload: data 
      }
    });
    throw new Error('ADN_CORRUPTO');
  }
  
  return result.data; // Dado purificado e tipado
};
6. O Papel da IA de Autocura
O AI-Neural-Auditor usará esses esquemas para:
Sugerir Migrações: "Percebi que 80% das falhas são no campo description. Sugiro aumentar o minSize ou adicionar um filtro de spam".
Gerar Testes: A IA lerá o esquema e gerará automaticamente 100 variações de dados inválidos para testar a resiliência do aparato.

---

