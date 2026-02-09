/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NeuralEntropyAnalyzer
 * @description Calcula limites dinâmicos de acesso baseados na reputação do rastro de rede.
 */

/**
 * @name NeuralEntropyAnalyzer
 * @function
 * @description Aplica a política de "Cota Decrescente": quanto maior o risco, menor o balde de tokens.
 *
 * @param {number} botReputationScore - Score vindo do NeuralBotSentinel (0-100).
 * @returns {number} Limite máximo de requisições por minuto.
 */
export const NeuralEntropyAnalyzer = (botReputationScore: number): number => {
  // 1. Cidadão ou Agente Confiável (Score < 20) -> 120 req/min
  if (botReputationScore < 20) return 120;

  // 2. Crawler Conhecido ou Suspeito Leve (Score 20-50) -> 60 req/min
  if (botReputationScore < 50) return 60;

  // 3. Automação Agressiva (Score 50-80) -> 10 req/min
  if (botReputationScore < 80) return 10;

  // 4. Ameaça Confirmada -> 1 req/min (Quarentena Técnica)
  return 1;
};
