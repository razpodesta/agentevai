/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignEngagementTrigger
 * @version 1.2.1
 * @protocol OEDP-V5.5 - High Precision & Neural Engagement
 * @description Gatilho de ação cidadã com suporte a estados cinéticos,
 * proteção anti-spam (Throttling) e auditoria forense integrada.
 * @policy ZERO-ANY: Erradicação de tipagem anárquica via Branded Type validation.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ESM-STRICT: Importações com extensões explícitas.
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

// CORREÇÃO ESM: Extensões explícitas para resolução NodeNext
import { KineticBackdrop } from './KineticBackdrop.js';
import {
  SovereignEngagementTriggerSchema,
  type ISovereignEngagementTrigger
} from './schemas/SovereignEngagementTrigger.schema.js';

/**
 * @name SovereignEngagementTrigger
 * @component
 * @description O ponto de ignição para a vontade do cidadão. Implementa feedback tátil visual.
 *
 * @param {ISovereignEngagementTrigger} properties - Propriedades de ação validadas pelo ADN.
 */
export const SovereignEngagementTrigger: React.FC<ISovereignEngagementTrigger> = (properties) => {
  const apparatusName = 'SovereignEngagementTrigger';
  const fileLocation = 'libs/foundation/ui-kit-atoms/src/lib/sovereign-engagement-trigger/SovereignEngagementTrigger.tsx';

  // 1. Aduana de ADN (Saneamento de Tipagem de Elite)
  const validatedData = useMemo(() => {
    const result = SovereignEngagementTriggerSchema.safeParse(properties);

    if (!result.success) {
      /**
       * @section CORREÇÃO DE QUALIDADE
       * Erradicação do 'as any'. Utilizamos o SovereignErrorCodeSchema.parse
       * para garantir que o código de erro respeita o ADN Branded do sistema.
       */
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-4002'),
        i18nMappingKey: 'ENGAGEMENT_TRIGGER_INVALID_PROPS',
        severity: 'HIGH',
        apparatusMetadata: {
          name: apparatusName,
          version: '1.2.1',
          fileLocation
        },
        runtimeSnapshot: {
          inputPayload: properties,
          correlationIdentifier: crypto.randomUUID(),
          validationIssues: result.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'STACK_TRACE_UNAVAILABLE'
        }
      });
    }
    return result.data;
  }, [properties]);

  // Extração segura para evitar erros de assinatura de índice (TS4111)
  const { label, hierarchy, status, onExecute } = validatedData;

  // 2. Handler de Execução com Proteção de Soberania
  const handleActionExecution = useCallback(() => {
    if (status !== 'IDLE') return;

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'INTENT_DISPATCHED',
      message: `Ação pública disparada: ${label}`,
      metadata: { hierarchy, executionContext: 'UI_CLICK' }
    });

    onExecute();
  }, [status, label, hierarchy, onExecute]);

  // 3. Mapeamento Estético de Elite
  const hierarchyStyles = {
    PRIMARY: "bg-brand-primary text-white hover:brightness-110 shadow-xl ring-1 ring-white/10",
    SECONDARY: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5",
    GHOST: "text-brand-action hover:bg-brand-action/10",
    CRITICAL: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20"
  };

  return (
    <motion.button
      whileHover={{ scale: status === 'IDLE' ? 1.02 : 1 }}
      whileTap={{ scale: status === 'IDLE' ? 0.98 : 1 }}
      onClick={handleActionExecution}
      disabled={status === 'DISABLED' || status === 'LOADING'}
      aria-label={`${label} - Estado atual: ${status}`}
      className={`
        relative overflow-hidden px-8 py-4 rounded-sm font-serif font-black uppercase tracking-widest
        transition-all duration-500 flex items-center justify-center gap-3 text-sm
        ${hierarchyStyles[hierarchy]}
        ${status === 'DISABLED' ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Efeito de Profundidade Cinética */}
      {hierarchy === 'PRIMARY' && status === 'IDLE' && <KineticBackdrop />}

      <AnimatePresence mode="wait">
        {status === 'LOADING' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex items-center gap-2"
          >
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-bold">PROCESSANDO</span>
          </motion.div>
        )}

        {status === 'SUCCESS' && (
          <motion.div
            key="success"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 text-green-400"
          >
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-bold">REGISTRADO</span>
          </motion.div>
        )}

        {status === 'IDLE' && (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {label}
          </motion.span>
        )}

        {status === 'DISABLED' && (
          <motion.div
            key="disabled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="flex items-center gap-2"
          >
            <AlertCircle size={16} />
            <span>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
