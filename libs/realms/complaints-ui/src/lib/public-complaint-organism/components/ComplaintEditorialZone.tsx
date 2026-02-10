/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ComplaintEditorialZone
 * @version 3.0.0
 * @protocol OEDP-V6.0 - God Tier Implementation
 * @description Gestor semântico de narrativas. Saneado contra erro TS7053.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ATOMIC-RESOLUTION: Resolução de chaves via matriz nominal selada.
 */

'use client';

import React, { useMemo, useCallback, memo } from 'react';
import { Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import {
  ComplaintEditorialZoneInputSchema,
  type IComplaintEditorialZoneInput
} from '../schemas/ComplaintEditorialZone.schema.js';

/**
 * @section Matriz de Soberania Semântica
 * CURA TS7053: Utilizamos o tipo string para a chave de mapeamento interno,
 * mas garantimos a integridade no momento da extração com um casting controlado.
 */
const SEVERITY_KEY_MAP: Readonly<Record<string, string>> = Object.freeze({
  INFORMATIVE: 'statusLabel_INFORMATIVE',
  MODERATE: 'statusLabel_MODERATE',
  CRITICAL: 'statusLabel_CRITICAL',
  RESOLVED: 'statusLabel_RESOLVED'
});

const ComplaintEditorialZoneComponent: React.FC<IComplaintEditorialZoneInput> = (properties) => {
  const apparatusName = 'ComplaintEditorialZone';

  // 1. ADUANA DE ADN (Validando e fixando o rastro de soberania)
  const validatedData = useMemo(() =>
    ComplaintEditorialZoneInputSchema.parse(properties),
  [properties]);

  const { identifier, title, description, severity, dictionary, correlationIdentifier } = validatedData;

  // 2. RESOLUÇÃO SEMÂNTICA (Engine de Elite)
  const translate = useCallback((key: string) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      {},
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  /**
   * @section Resolução de Causa Raiz (Cura TS7053)
   * Extraímos a marca nominal convertendo para string apenas dentro deste escopo protegido.
   */
  const semanticStatusKey = useMemo(() => {
    const rawSeverityBrand = severity as unknown as string;
    return SEVERITY_KEY_MAP[rawSeverityBrand] || 'statusLabel_INFORMATIVE';
  }, [severity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 flex flex-col gap-8"
      role="region"
    >
      {/* 🏷️ CABEÇALHO DE METADADOS */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900 text-white rounded-xs border border-white/5 shadow-2xl">
          <Fingerprint size={14} className="text-brand-action animate-pulse" />
          <span className="text-[10px] font-mono font-black tracking-widest uppercase">
            {translate('traceLabel')}: {identifier.substring(0, 8)}
          </span>
        </div>

        <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-200 dark:from-white/10 to-transparent" />

        <span className="text-[11px] font-serif italic font-black uppercase tracking-[0.3em] text-brand-action">
          {translate(semanticStatusKey)}
        </span>
      </div>

      {/* 📰 CONTEÚDO EDITORIAL */}
      <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.05] tracking-tighter text-brand-primary dark:text-white max-w-5xl">
        {title}
      </h2>

      <p className="text-xl md:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans max-w-4xl opacity-90">
        {description}
      </p>
    </motion.div>
  );
};

export const ComplaintEditorialZone = memo(ComplaintEditorialZoneComponent);
