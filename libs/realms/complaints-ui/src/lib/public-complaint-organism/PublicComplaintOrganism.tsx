/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism
 * @version 6.5.7
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Orquestrador central de fiscalização cidadã.
 * CURADO: Erradicados erros de assinatura funcional e colapso de marca nominal.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento absoluto via re-selagem de ADN.
 * @policy PERFORMANCE-ELITE: Monitoramento de latência de ignição e memoização.
 */

'use client';

import React, { useMemo, memo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Reinos Federados (Identity & Governance) */
import { CitizenAuraCard, CitizenAuraCardSchema } from '@agentevai/community-ui';
import { PopularSupportTrigger, PopularSupportTriggerInputSchema } from '@agentevai/governance-ui';

/** @section ADN Local e Zonas Atômicas */
import {
  PublicComplaintOrganismInputSchema,
  type IPublicComplaintOrganismInput
} from './schemas/PublicComplaintOrganism.schema.js';

import { ComplaintEditorialZone } from './components/ComplaintEditorialZone.js';
import { ComplaintEvidenceZone } from './components/ComplaintEvidenceZone.js';
import { SovereignPublicTrustSeal } from './components/SovereignPublicTrustSeal.js';

import { ComplaintEditorialZoneInputSchema } from './schemas/ComplaintEditorialZone.schema.js';
import {
  ComplaintEvidenceZoneInputSchema,
  PublicTrustSealInputSchema
} from './schemas/ComplaintSubComponents.schema.js';

/**
 * @section Matriz de Estética Soberana (Manifesto 0008)
 * Mapeamento determinístico de bordas e sombras por nível de urgência.
 */
const SEVERITY_THEME_REGISTRY: Readonly<Record<string, string>> = Object.freeze({
  INFORMATIVE: 'border-l-blue-500 bg-blue-500/5 shadow-blue-500/5',
  MODERATE: 'border-l-amber-500 bg-amber-500/5 shadow-amber-500/5',
  CRITICAL: 'border-l-red-600 bg-red-600/5 shadow-red-600/5',
  RESOLVED: 'border-l-green-600 bg-green-600/5 shadow-green-600/5'
});

/**
 * @name PublicComplaintOrganism
 * @component
 */
const PublicComplaintOrganismComponent: React.FC<IPublicComplaintOrganismInput> = (properties) => {
  const apparatusName = 'PublicComplaintOrganism';
  const fileLocation = 'libs/realms/complaints-ui/src/lib/public-complaint-organism/PublicComplaintOrganism.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA MESTRE (Ingresso Seguro e Fixação de Rastro)
    const data = PublicComplaintOrganismInputSchema.parse(properties);
    const {
      identifier, severity, dictionary, correlationIdentifier, title, description,
      mediaUrl, merkleRootAnchor, author, userSignatureStatus, supportCount,
      currentUserAssuranceLevel, onSignRequest, locationLabel
    } = data;

    // 2. RESOLUÇÃO SEMÂNTICA (Pilar V: Soberania Linguística)
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '6.5.7' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        variables,
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 3. TELEMETRIA DE IGNIÇÃO E PERFORMANCE (Pilar VI: Neural Pulse)
    useEffect(() => {
      const endTimestamp = performance.now();
      const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'COMPLAINT_STABILIZED',
        message: translateLabel('logOrganismMounted', { identifier: identifier.substring(0, 8) }),
        correlationIdentifier,
        metadata: { latencyMs: mountingLatency, severity }
      });
    }, [identifier, correlationIdentifier, translateLabel, startTimestamp, severity]);

    /**
     * @section RE-SELAGEM DE ADN PARA FILHOS (Cura TS2739/TS2741)
     * Cada objeto é carimbado pela sua aduana antes de cruzar a fronteira do filho.
     * Isso garante que a marca nominal ($brand) flua pela árvore sem erros de tipagem.
     */
    const editorialProperties = useMemo(() => ComplaintEditorialZoneInputSchema.parse({
      identifier, title, description, severity, dictionary, correlationIdentifier
    }), [identifier, title, description, severity, dictionary, correlationIdentifier]);

    const evidenceProperties = useMemo(() => ComplaintEvidenceZoneInputSchema.parse({
      mediaUrl, alternateText: title, correlationIdentifier
    }), [mediaUrl, title, correlationIdentifier]);

    const sealProperties = useMemo(() => PublicTrustSealInputSchema.parse({
      merkleRootAnchor, dictionary, correlationIdentifier
    }), [merkleRootAnchor, dictionary, correlationIdentifier]);

    const authorProperties = useMemo(() => CitizenAuraCardSchema.parse({
      ...author, dictionary, correlationIdentifier
    }), [author, dictionary, correlationIdentifier]);

    /**
     * @section CURA_TS2554 (Sincronia de Assinatura)
     * A invocação agora respeita a assinatura explícita (identifier) definida no ADN V4.
     */
    const supportTriggerProperties = useMemo(() => PopularSupportTriggerInputSchema.parse({
      status: userSignatureStatus,
      currentSupportCount: supportCount,
      assuranceLevel: currentUserAssuranceLevel,
      dictionary,
      correlationIdentifier,
      onSignIntent: async () => onSignRequest(identifier)
    }), [userSignatureStatus, supportCount, currentUserAssuranceLevel, dictionary, correlationIdentifier, onSignRequest, identifier]);

    const activeThemeClass = SEVERITY_THEME_REGISTRY[severity as unknown as string] || SEVERITY_THEME_REGISTRY['INFORMATIVE'];

    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full border border-neutral-200 dark:border-white/10 rounded-sm shadow-2xl overflow-hidden transition-all duration-1000 ${activeThemeClass}`}
      >
        {/* 🏛️ CABEÇALHO DE AUTORIDADE */}
        <header className="p-8 border-b border-neutral-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
          <CitizenAuraCard {...authorProperties} />

          <div className="flex flex-col items-start md:items-end text-brand-primary dark:text-brand-action">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="animate-bounce" />
              <span className="text-xs font-mono font-black uppercase tracking-widest">
                {locationLabel}
              </span>
            </div>
            <p className="mt-3 text-[9px] font-mono text-neutral-500 uppercase tracking-tighter opacity-60">
              {translateLabel('locationAria', { location: locationLabel })}
            </p>
          </div>
        </header>

        {/* 📝 ZONAS ATÔMICAS DE CONTEÚDO */}
        <ComplaintEditorialZone {...editorialProperties} />

        <AnimatePresence mode="wait">
          {mediaUrl && (
            <motion.div
              key="evidence_stream"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ComplaintEvidenceZone {...evidenceProperties} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🗳️ RODAPÉ DE ENGAJAMENTO E FÉ PÚBLICA */}
        <footer className="p-10 bg-neutral-50 dark:bg-white/2 flex flex-col lg:flex-row justify-between items-center gap-12 border-t border-neutral-200 dark:border-white/5">
          <div className="w-full lg:max-w-md">
            <PopularSupportTrigger {...supportTriggerProperties} />
          </div>
          <SovereignPublicTrustSeal {...sealProperties} />
        </footer>
      </motion.article>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-6001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'Verificar integridade do rastro de ADN ou versão do motor Framer Motion no ambiente de execução.'
    });
  }
};

export const PublicComplaintOrganism = memo(PublicComplaintOrganismComponent);
