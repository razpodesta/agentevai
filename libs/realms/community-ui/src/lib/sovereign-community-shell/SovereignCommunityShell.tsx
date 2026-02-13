/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignCommunityShell
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Prestige Editorial Architecture
 * @description Orquestrador de layout saneado. 
 * CURADO: Erradicado TS2307 via ancoragem direta em arquivos de lógica e ADN.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via ISovereignDictionary.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, LayoutDashboard } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import { 
  SovereignCommunityShellInputSchema, 
  type ISovereignCommunityShellInput 
} from './schemas/SovereignCommunityShell.schema.js';

/** 
 * @section CURA TS2307 
 * Rastro corrigido: Aponta diretamente para os arquivos físicos, 
 * ignorando o vácuo de index.js no subdiretório.
 */
import { CitizenAuraCard } from '../citizen-aura-card/CitizenAuraCard.js';
import { CitizenAuraCardSchema } from '../citizen-aura-card/schemas/CitizenAuraCard.schema.js';
import { ImpactMetricCard } from './components/ImpactMetricCard.js';

const SovereignCommunityShellComponent: React.FC<ISovereignCommunityShellInput> = (properties) => {
  const apparatusName = 'SovereignCommunityShell';
  const fileLocation = 'libs/realms/community-ui/src/lib/sovereign-community-shell/SovereignCommunityShell.tsx';
  const startTimestamp = performance.now();

  // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
  const data = useMemo(() => {
    try {
      return SovereignCommunityShellInputSchema.parse(properties);
    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-APP-4001'),
        apparatus: apparatusName,
        location: fileLocation,
        correlationIdentifier: properties.correlationIdentifier,
        severity: 'CRITICAL'
      });
    }
  }, [properties]);

  const { activeCitizen, children, dictionary, correlationIdentifier } = data;

  // 2. RESOLUÇÃO SEMÂNTICA (Pilar 5)
  const translateLabel = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  // 3. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
  useEffect(() => {
    const endTimestamp = performance.now();
    const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'SHELL_IGNITION_SUCCESS',
      message: translateLabel('logShellIgnition', { correlationIdentifier }),
      correlationIdentifier,
      metadata: { 
        latencyMs: mountingLatency,
        citizenRole: activeCitizen.identityRole 
      }
    });
  }, [activeCitizen.identityRole, correlationIdentifier, translateLabel, startTimestamp]);

  // 4. RE-SELAGEM DE ADN PARA FILHOS (Cura TS2741)
  const citizenAuraProperties = useMemo(() => {
    return CitizenAuraCardSchema.parse({
      ...activeCitizen,
      dictionary,
      correlationIdentifier,
    });
  }, [activeCitizen, dictionary, correlationIdentifier]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-1000 antialiased font-sans">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* 🧱 SIDEBAR DE AUTORIDADE */}
        <motion.aside 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4"
        >
          <section className="sticky top-32 flex flex-col gap-10">
            <header className="flex items-center gap-4 border-b border-neutral-100 dark:border-white/5 pb-4">
                <Users size={24} className="text-brand-action" />
                <h2 className="font-serif font-black text-sm uppercase tracking-[0.3em] text-neutral-400">
                    {translateLabel('citizenAuthorityTitle')}
                </h2>
            </header>

            {/* Aparato de Identidade Selado via ADN Nominal */}
            <CitizenAuraCard {...citizenAuraProperties} />

            <ImpactMetricCard 
              reputationScore={activeCitizen.reputationStandingScore}
              metricLabel={translateLabel('impactMetricLabel')}
              statusMessage={translateLabel('sovereignStatusMessage')}
            />
          </section>
        </motion.aside>

        {/* 🏛️ ÁREA DE CONTEÚDO SOBERANO */}
        <main className="lg:col-span-8 flex flex-col gap-12">
          <motion.header 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-l-4 border-brand-action pl-8 flex items-center gap-4"
          >
             <div className="p-3 bg-neutral-100 dark:bg-white/5 rounded-xs shadow-sm">
                <LayoutDashboard size={24} className="text-brand-primary dark:text-white" />
             </div>
             <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-brand-primary dark:text-white leading-tight">
                {translateLabel('communityFeedTitle')}
             </h1>
          </motion.header>

          <AnimatePresence mode="wait">
            <motion.section 
              key="community_feed_stream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {children}
            </motion.section>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export const SovereignCommunityShell = memo(SovereignCommunityShellComponent);