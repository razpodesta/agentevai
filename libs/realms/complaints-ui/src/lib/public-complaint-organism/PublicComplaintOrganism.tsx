/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism
 * @version 7.0.0
 * @protocol OEDP-V6.0 - God Tier Orchestration
 * @description Orquestrador saneado e sincronizado com a Fachada de ADN.
 * Erradicados erros de importação e marcas nominais.
 */

'use client';

import React, { useMemo, memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Reinos Federados */
import { CitizenAuraCard, CitizenAuraCardSchema } from '@agentevai/community-ui';
import { PopularSupportTrigger, PopularSupportTriggerInputSchema } from '@agentevai/governance-ui';

/** @section ADN Local e Sub-Zonas */
import {
  PublicComplaintOrganismInputSchema,
  type IPublicComplaintOrganismInput
} from './schemas/PublicComplaintOrganism.schema.js';

import {
  ComplaintEditorialZoneInputSchema, // CURADO: Nome exaustivo
  ComplaintEvidenceZoneInputSchema,
  PublicTrustSealInputSchema
} from './schemas/ComplaintSubComponents.schema.js';

import { ComplaintEditorialZone } from './components/ComplaintEditorialZone.js';
import { ComplaintEvidenceZone } from './components/ComplaintEvidenceZone.js';
import { SovereignPublicTrustSeal } from './components/SovereignPublicTrustSeal.js';

const SEVERITY_THEME_REGISTRY: Readonly<Record<string, string>> = Object.freeze({
  INFORMATIVE: 'border-l-blue-500 bg-blue-500/5',
  MODERATE: 'border-l-amber-500 bg-amber-500/5',
  CRITICAL: 'border-l-red-600 bg-red-600/5',
  RESOLVED: 'border-l-green-600 bg-green-600/5'
});

const PublicComplaintOrganismComponent: React.FC<IPublicComplaintOrganismInput> = (properties) => {
  const apparatusName = 'PublicComplaintOrganism';
  const fileLocation = 'libs/realms/complaints-ui/src/lib/public-complaint-organism/PublicComplaintOrganism.tsx';

  const validated = useMemo(() => {
    const result = PublicComplaintOrganismInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'COMPLAINT_ORGANISM_ADN_CORRUPTED',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '7.0.0', fileLocation },
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
  } = validated;

  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'ORGANISM_IGNITION',
      message: `Denúncia [${identifier.substring(0, 8)}] processada no enxame regional.`,
      correlationIdentifier
    });
  }, [identifier, correlationIdentifier]);

  // 3. SELAGEM DE SUB-PROPRIEDADES (Sincronia Perfeita)
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
      className={`relative w-full border border-neutral-200 dark:border-white/10 rounded-sm shadow-2xl overflow-hidden transition-all duration-700 ${activeThemeClass}`}
    >
      <header className="p-6 border-b border-neutral-100 dark:border-white/5 flex justify-between items-center bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <CitizenAuraCard {...authorProperties} />
        <div className="flex items-center gap-2 text-brand-primary dark:text-brand-action">
          <MapPin size={14} className="animate-bounce" />
          <span className="text-[11px] font-mono font-black uppercase tracking-widest">{locationLabel}</span>
        </div>
      </header>

      <ComplaintEditorialZone {...editorialProperties} />
      <ComplaintEvidenceZone {...evidenceProperties} />

      <footer className="p-10 bg-neutral-50 dark:bg-white/2 flex flex-col lg:flex-row justify-between items-center gap-12 border-t border-neutral-200 dark:border-white/5">
        <div className="w-full lg:max-w-md">
          <PopularSupportTrigger {...supportTriggerProperties} />
        </div>
        <SovereignPublicTrustSeal {...sealProperties} />
      </footer>
    </motion.article>
  );
};

export const PublicComplaintOrganism = memo(PublicComplaintOrganismComponent);
