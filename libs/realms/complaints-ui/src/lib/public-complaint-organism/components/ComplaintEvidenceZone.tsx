/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ComplaintEvidenceZone
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Kinetic Visuals & Forensic Trace
 * @description Orquestrador de rastro visual de denúncias. Erradica o erro TS2353
 * ao sincronizar o rastro de telemetria com o ADN Mestre do Logger.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

'use client';

import React, { useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/**
 * @section Sincronia de ADN
 * Importação estrita via NodeNext.
 */
import {
  ComplaintEvidenceZoneInputSchema,
  type IComplaintEvidenceZoneInput
} from '../schemas/ComplaintSubComponents.schema.js';

/**
 * @name ComplaintEvidenceZone
 * @component
 * @description Unidade atômica de visualização de provas com profundidade cinética.
 */
const ComplaintEvidenceZoneComponent: React.FC<IComplaintEvidenceZoneInput> = (properties) => {
  const apparatusName = 'ComplaintEvidenceZone';

  // 1. ADUANA DE ADN (Garante integridade estrutural e rastro forense)
  const validatedData = useMemo(() => {
    return ComplaintEvidenceZoneInputSchema.parse(properties);
  }, [properties]);

  const { mediaUrl, alternateText, correlationIdentifier } = validatedData;

  // 2. TELEMETRIA DE IMPRESSÃO VISUAL (Cura TS2353: correlationIdentifier)
  useEffect(() => {
    if (mediaUrl) {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'EVIDENCE_RENDERED',
        message: 'Rastro visual de denúncia selado no viewport do cidadão.',
        correlationIdentifier: correlationIdentifier,
        metadata: {
          hasActiveMedia: true,
          mediaEndpoint: mediaUrl.substring(0, 40) + '...'
        }
      });
    }
  }, [mediaUrl, correlationIdentifier]);

  // Protocolo de Resiliência: O aparato entra em hibernação se o rastro de mídia for nulo.
  if (!mediaUrl) return null;

  return (
    <div className="px-10 pb-10 w-full" role="figure">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-video rounded-xs overflow-hidden border border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-black group shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        {/* 📸 CAMADA DE RASTRO VISUAL SOBERANA */}
        <img
          src={mediaUrl}
          alt={alternateText}
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
        />

        {/* 🌑 AURA CINÉTICA DE PROFUNDIDADE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none opacity-80" />

        {/* 🛠️ GATILHO VISUAL DE INTERAÇÃO */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
           <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-5 bg-brand-action text-black rounded-full shadow-2xl cursor-zoom-in"
           >
              <ZoomIn size={28} strokeWidth={2.5} />
           </motion.div>
        </div>

        {/* 🏷️ INDICADOR DE VERACIDADE VISUAL */}
        <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-2 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-full select-none shadow-xl">
          <ImageIcon size={14} className="text-brand-action animate-pulse" />
          <span className="text-[10px] font-mono text-white uppercase tracking-[0.3em] font-black">
            Verified Forensic Trace
          </span>
        </div>

        {/* 📝 LEGENDA DE ACESSIBILIDADE SOBERANA */}
        <figcaption className="sr-only">
          {alternateText}
        </figcaption>
      </motion.div>
    </div>
  );
};

export const ComplaintEvidenceZone = memo(ComplaintEvidenceZoneComponent);
