/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism
 * @version 1.0.0
 * @protocol OEDP-V5.5.2 - Kinetic Sovereignty
 * @description Organismo mestre que orquestra Identidade, Conteúdo e Governança.
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin } from 'lucide-react';
import { CitizenAuraCard } from '@agentevai/community-ui';
import { PopularSupportTrigger } from '@agentevai/governance-ui';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

// ADN
import { 
  PublicComplaintOrganismInputSchema, 
  type IPublicComplaintOrganismInput 
} from './schemas/PublicComplaintOrganism.schema.js';

export const PublicComplaintOrganism: React.FC<IPublicComplaintOrganismInput> = (properties) => {
  const apparatusName = 'PublicComplaintOrganism';

  // 1. Aduana de ADN
  const validatedData = useMemo(() => {
    const result = PublicComplaintOrganismInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'ADN_CORRUPTION_DETECTED',
        severity: 'HIGH',
        apparatusMetadata: { 
          name: apparatusName, 
          version: '1.0.0', 
          fileLocation: 'libs/realms/complaints-ui/src/lib/public-complaint-organism/PublicComplaintOrganism.tsx' 
        },
        runtimeSnapshot: { 
          inputPayload: properties,
          correlationIdentifier: properties.correlationIdentifier,
          validationIssues: result.error.issues 
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'COMPLAINT_UI_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. Resolução Semântica
  const translateLabel = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      validatedData.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      variables,
      validatedData.correlationIdentifier
    );
  }, [validatedData.dictionary, validatedData.correlationIdentifier]);

  // 3. Estética de Severidade (Manifesto 0008)
  const severityTheme = {
    INFORMATIVE: 'border-l-blue-500 bg-blue-500/5',
    MODERATE: 'border-l-amber-500 bg-amber-500/5',
    CRITICAL: 'border-l-red-600 bg-red-600/5',
    RESOLVED: 'border-l-green-600 bg-green-600/5'
  }[validatedData.severity];

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full border border-neutral-200 dark:border-white/10 rounded-sm shadow-sm overflow-hidden transition-all duration-700 ${severityTheme}`}
    >
      {/* 🏛️ Seção de Autoridade (Identidade do Denunciante) */}
      <header className="p-4 border-b border-neutral-100 dark:border-white/5 flex flex-wrap justify-between items-center bg-neutral-50/50 dark:bg-black/20 gap-4">
        <CitizenAuraCard 
            citizenName={validatedData.author.citizenName}
            reputationStandingScore={validatedData.author.reputationStandingScore}
            identityRole={validatedData.author.identityRole}
            correlationIdentifier={validatedData.correlationIdentifier}
            assuranceLevel="IAL2_VERIFIED" // Mock até nivelamento final de Identity
        />
        
        <div className="flex items-center gap-2 text-brand-primary dark:text-brand-action">
          <MapPin size={14} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-black">{validatedData.locationLabel}</span>
        </div>
      </header>

      {/* 📰 Seção Editorial (Conteúdo da Denúncia) */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
           <span className="px-2 py-0.5 bg-neutral-800 text-white text-[9px] font-mono rounded-xs">
              ID: {validatedData.identifier.substring(0, 8)}
           </span>
           <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
              {translateLabel(`status_${validatedData.severity}`)}
           </span>
        </div>

        <h2 className="text-3xl font-serif font-black leading-none tracking-tighter text-brand-primary dark:text-white mb-6">
          {validatedData.title}
        </h2>

        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans max-w-3xl">
          {validatedData.description}
        </p>
      </div>

      {/* 🗳️ Seção de Governança (Fé Pública e Apoio) */}
      <footer className="p-6 bg-neutral-50 dark:bg-black/40 border-t border-neutral-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Atuador de Assinatura Eletrônica (Governança Integrada) */}
        <div className="w-full md:w-auto">
          <PopularSupportTrigger 
             currentSupportCount={validatedData.supportCount}
             assuranceLevel="IAL3_SOVEREIGN" // Injetado via Context em produção
             correlationIdentifier={validatedData.correlationIdentifier}
             dictionary={validatedData.dictionary}
             onSignIntent={async () => {
                SovereignLogger({
                    severity: 'INFO',
                    apparatus: apparatusName,
                    operation: 'SIGNATURE_INITIATED',
                    message: `Cidadão iniciou rastro de apoio para denúncia ${validatedData.identifier}`,
                    traceIdentifier: validatedData.correlationIdentifier
                });
             }}
          />
        </div>

        {/* Selo de Imutabilidade Blockchain */}
        <div className="flex flex-col items-end group cursor-help">
          <div className="flex items-center gap-2 text-green-600 dark:text-brand-action">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-mono font-black uppercase tracking-tighter">{translateLabel('blockchainVerified')}</span>
          </div>
          <p className="text-[9px] font-mono text-neutral-400 mt-1 truncate max-w-[150px] group-hover:max-w-none transition-all duration-500">
            {validatedData.merkleRootAnchor}
          </p>
        </div>
      </footer>
    </motion.article>
  );
};