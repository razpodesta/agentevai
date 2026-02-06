/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GoogleGeminiHealthDriver
 * @description Driver especializado para diagnóstico via Google Gemini 3.0.
 * Rota Relativa: libs/integrations/ai-model-orchestrator/src/lib/providers/google-gemini/GoogleGeminiHealthDriver.ts
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { IHealthTask } from '../../schemas/AIModelOrchestrator.schema';

export const GoogleGeminiHealthDriver = async (task: IHealthTask): Promise<string> => {
  // Soberania Financeira: Key exclusiva para saúde
  const apiKey = process.env['SOVEREIGN_HEALTH_AI_API_KEY'];
  
  if (!apiKey) throw new Error('MISSING_HEALTH_AI_KEY');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: task.modelTier });

  const prompt = `
    [MAINTENANCE_MODE_ACTIVE]
    DIRECTIVE: ${task.maintenanceDirective}
    
    APP_CODE: ${task.contextPayload.apparatusCode}
    ERROR: ${task.contextPayload.errorMessage}
    STACK: ${task.contextPayload.stackTrace}
    INPUT_DATA_AT_ERROR: ${JSON.stringify(task.contextPayload.inputSnapshot)}
    
    Analise a falha acima e proponha uma correção imediata respeitando SOLID e DRY.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};