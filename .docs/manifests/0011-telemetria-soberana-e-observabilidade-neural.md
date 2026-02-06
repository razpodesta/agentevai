Manifesto 0011: Telemetria Soberana e Observabilidade Neural

**Autor:** Raz Podestá - MetaShark Tech  
**Status:** Vital / Em vigor  
**Escopo:** `libs/orchestration/sovereign-logger`

## 1. Filosofia: O Log como Sensor de Inteligência
No Agentevai, os logs não são arquivos mortos. Eles são o fluxo sanguíneo de dados que alimenta a IA de auto-aperfeiçoamento. Cada "batida" do sistema deve ser registrada com metadados que permitam à IA reconstruir o estado mental do software.

## 2. Estrutura do Dado (The Neural Log Entry)
Todo log deve ser emitido seguindo o contrato `SovereignLogSchema`, incluindo:
- **Trace_ID:** Identificador único da jornada do usuário (cross-app).
- **Apparatus_Fingerprint:** Hash único da versão do código do aparato.
- **Cognitive_Payload:** Se envolver IA, registrar tokens, modelo e latência neural.
- **Sovereign_Context:** Tenant_ID e Geo_Location (anonimizados).

## 3. Categorias de Observabilidade
1. **PERFORMANCE:** Latência física de rede e CPU.
2. **COGNITIVE:** Qualidade da resposta da IA e custo financeiro.
3. **INTEGRITY:** Sucesso ou falha em contratos SSOT (Zod).
4. **HEALTH:** Uso de recursos e temperatura operativa do Lego.

## 4. O Fluxo de Escuta da IA (Self-Healing Loop)
O `SovereignLogger` possui um `NeuralEmitter`. Este emissor filtra logs de nível `ERROR` ou `DEGRADED` e os despacha instantaneamente para o `ai-model-orchestrator`, iniciando o diagnóstico automatizado sem intervenção humana.

## 5. Regras de Ouro
- **Zero Abreviatura:** `latencyInMilliseconds` em vez de `lat`.
- **Inmutabilidade:** Logs gerados são assinados digitalmente para evitar manipulação de rastros forenses.