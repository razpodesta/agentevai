/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism
 * @version 6.0.0
 * @protocol OEDP-V6.0 - God Tier Implementation
 * @description Orquestrador central de fiscalização cidadã. 
 * Integra Identidade (Aura), Governança (Votos) e Blockchain (Merkle Seal).
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ATOMIC-DECOMPOSITION: Gestão de zonas de responsabilidade única.
 */

'use client';

import React, { useMemo, memo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Fingerprint } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Reinos Federados (Identity & Governance) */
import { CitizenAuraCard, CitizenAuraCardSchema } from '@agentevai/community-ui';
import { PopularSupportTrigger, PopularSupportTriggerInputSchema } from '@agentevai/governance-ui';

/** @section ADN Local */
import { 
  PublicComplaintOrganismInputSchema, 
  type IPublicComplaintOrganismInput 
} from './schemas/PublicComplaintOrganism.schema.js';

/** @section Matriz de Estética (Visual Matrix) */
const SEVERITY_THEME_REGISTRY: Readonly<Record<string, string>> = Object.freeze({
  INFORMATIVE: 'border-l-blue-500 bg-blue-500/5',
  MODERATE: 'border-l-amber-500 bg-amber-500/5',
  CRITICAL: 'border-l-red-600 bg-red-600/5',
  RESOLVED: 'border-l-green-600 bg-green-600/5'
});

const PublicComplaintOrganismComponent: React.FC<IPublicComplaintOrganismInput> = (properties) => {
  const apparatusName = 'PublicComplaintOrganism';
  const fileLocation = 'libs/realms/complaints-ui/src/lib/public-complaint-organism/PublicComplaintOrganism.tsx';

  // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
  const data = useMemo(() => {
    const result = PublicComplaintOrganismInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'COMPLAINT_ORGANISM_ADN_CORRUPTED',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '6.0.0', fileLocation },
        runtimeSnapshot: { 
          inputPayload: properties, 
          correlationIdentifier: properties.correlationIdentifier,
          validationIssues: result.error.issues 
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'UI_ORGANISM_IGNITION' }
      });
    }
    return result.data;
  }, [properties]);

  const { 
    identifier, severity, dictionary, correlationIdentifier, title, description,
    mediaUrl, merkleRootAnchor, author, userSignatureStatus, supportCount,
    currentUserAssuranceLevel, onSignRequest, locationLabel 
  } = data;

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      variables,
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  // 3. TELEMETRIA DE POSICIONAMENTO
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'COMPLAINT_VISIBLE',
      message: translate('logOrganismMounted', { identifier: identifier.substring(0, 8) }),
      correlationIdentifier
    });
  }, [identifier, correlationIdentifier, translate]);

  /** @section RE-SELAGEM DE ADN PARA FILHOS (Cura TS2741) */
  const authorProperties = useMemo(() => CitizenAuraCardSchema.parse({
    ...author, dictionary, correlationIdentifier
  }), [author, dictionary, correlationIdentifier]);

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full border border-neutral-200 dark:border-white/10 rounded-sm shadow-2xl overflow-hidden transition-all duration-700 ${activeThemeClass}`}
    >
      {/* 🏛️ CABEÇALHO DE AUTORIDADE */}
      <header className="p-6 border-b border-neutral-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <CitizenAuraCard {...authorProperties} />
        
        <div className="flex flex-col items-start md:items-end text-brand-primary dark:text-brand-action">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="animate-bounce" />
            <span className="text-[11px] font-mono font-black uppercase tracking-widest" aria-label={translate('locationAria', { location: locationLabel })}>
              {locationLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-black text-white rounded-xs border border-white/5 shadow-inner">
            <Fingerprint size={10} className="text-brand-action" />
            <span className="text-[9px] font-mono font-bold tracking-tighter uppercase">{translate('traceLabel')}: {identifier.substring(0, 8)}</span>
          </div>
        </div>
      </header>

      {/* 📝 ZONA EDITORIAL */}
      <div className="p-10 flex flex-col gap-6">
        <span className="text-[10px] font-serif italic font-black uppercase tracking-[0.3em] text-brand-action">
           {translate(`statusLabel_${severity as unknown as string}`)}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-black leading-[1.05] tracking-tighter text-brand-primary dark:text-white max-w-5xl">
          {title}
        </h2>
        <p className="text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans max-w-4xl opacity-90">
          {description}
        </p>
      </div>

      {/* 📸 ZONA DE EVIDÊNCIA VISUAL */}
      {mediaUrl && (
        <div className="px-10 pb-10 w-full">
          <div className="relative aspect-video rounded-xs overflow-hidden border border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-black group shadow-xl">
             <img src={mediaUrl} alt={title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>
      )}

      {/* 🛡️ RODAPÉ DE ENGAJAMENTO E BLOCKCHAIN */}
      <footer className="p-10 bg-neutral-50 dark:bg-white/2 flex flex-col lg:flex-row justify-between items-center gap-12 border-t border-neutral-200 dark:border-white/5">
        <div className="w-full lg:max-w-md">
          <PopularSupportTrigger {...supportTriggerProperties} />
        </div>

        <div className="flex flex-col items-center lg:items-end group cursor-help opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 text-green-600 dark:text-brand-action">
            <div className="relative">
              <ShieldCheck size={20} />
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-current rounded-full -z-10" />
            </div>
            <span className="text-xs font-mono font-black uppercase tracking-widest">{translate('blockchainVerifiedLabel')}</span>
          </div>
          <p className="text-[10px] font-mono text-neutral-500 mt-2 truncate max-w-[200px] lg:max-w-none">{merkleRootAnchor}</p>
        </div>
      </footer>
    </motion.article>
  );
};

export const PublicComplaintOrganism = memo(PublicComplaintOrganismComponent);