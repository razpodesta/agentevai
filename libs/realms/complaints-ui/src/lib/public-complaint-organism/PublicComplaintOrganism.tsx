/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism (RSC)
 * @description Unidade fundamental de visualização de denúncias.
 * Orquestra Identidade, Reação e Prova Blockchain.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica integral.
 * @policy MOBILE-FIRST: Layout adaptativo para consumo em movimento.
 */

import React from 'react';
import { CitizenAuraCard, SovereignReactionTrigger } from '@agentevai/community-ui';
import {
  PublicComplaintOrganismSchema,
  type IPublicComplaintOrganism
} from './schemas/PublicComplaintOrganism.schema.js';

export const PublicComplaintOrganism: React.FC<IPublicComplaintOrganism> = (properties) => {
  // 1. Aduana de ADN
  const data = PublicComplaintOrganismSchema.parse(properties);

  // 2. Mapeamento de Semântica Visual (Manifesto 0008)
  const severityColors = {
    INFORMATIVE: 'border-l-brand-action bg-brand-action/5',
    MODERATE: 'border-l-amber-500 bg-amber-500/5',
    CRITICAL: 'border-l-red-600 bg-red-600/5',
    RESOLVED: 'border-l-green-600 bg-green-600/5',
  };

  return (
    <article className={`
      relative flex flex-col w-full border-l-4 shadow-sm transition-all duration-300
      bg-white dark:bg-neutral-900/40 border-y border-r border-neutral-200 dark:border-white/5
      ${severityColors[data.severity]}
    `}>

      {/* 🏛️ HEADER: Autoridade e Localização */}
      <div className="p-4 border-b border-neutral-100 dark:border-white/5 flex justify-between items-center bg-neutral-50/50 dark:bg-black/20">
        <CitizenAuraCard {...data.author} />
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Localização</p>
          <p className="text-xs font-serif italic text-brand-primary dark:text-brand-action">{data.locationLabel}</p>
        </div>
      </div>

      {/* 📰 BODY: Conteúdo Editorial */}
      <div className="p-6 flex flex-col gap-4">
        <header>
          <h2 className="text-2xl font-serif font-black leading-tight text-neutral-800 dark:text-white tracking-tighter">
            {data.title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
             <span className="h-[1px] w-8 bg-brand-action" />
             <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
               Rastro: {data.identifier.substring(0, 8)}
             </span>
          </div>
        </header>

        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans max-w-prose">
          {data.description}
        </p>

        {/* 🖼️ MEDIA: Mídia Normalizada (Se houver) */}
        {data.mediaUrl && (
          <div className="mt-4 rounded-sm overflow-hidden border border-neutral-200 dark:border-white/10 aspect-video bg-black">
             <img src={data.mediaUrl} alt={data.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      {/* 🛡️ FOOTER: Reação e Fé Pública (Blockchain) */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-neutral-100 dark:border-white/5">

        {/* Atuadores de Vontade (Reações) */}
        <div className="flex items-center gap-4">
          <SovereignReactionTrigger
            reactionType="SUPPORT"
            interactionCount={data.supportCount}
            isUserActivelyEngaged={false}
            correlationIdentifier={data.correlationIdentifier}
            onInteractionIgnition={() => {}}
          />
          <SovereignReactionTrigger
            reactionType="REJECT"
            interactionCount={data.rejectionCount}
            isUserActivelyEngaged={false}
            correlationIdentifier={data.correlationIdentifier}
            onInteractionIgnition={() => {}}
          />
        </div>

        {/* Selo de Verdade Matemática */}
        <div className="flex flex-col items-center sm:items-end group cursor-help">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tighter">Blockchain Verified</span>
            <div className="w-2 h-2 rounded-full bg-brand-action animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-neutral-500 truncate max-w-[120px] group-hover:max-w-none transition-all duration-700">
            {data.merkleRootAnchor}
          </p>
        </div>
      </div>

    </article>
  );
};
