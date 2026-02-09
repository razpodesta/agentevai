import React from 'react';
import { Play, Headphones, Image as ImageIcon } from 'lucide-react';

interface ITeaserMediaZone {
  readonly mediaType: 'IMAGE' | 'VIDEO' | 'AUDIO';
  readonly mediaUrl: string;
  readonly categoryLabel: string;
}

export const TeaserMediaZone: React.FC<ITeaserMediaZone> = ({ mediaType, mediaUrl, categoryLabel }) => {
  const MediaIcon = { IMAGE: ImageIcon, VIDEO: Play, AUDIO: Headphones }[mediaType];

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-sm group">
      {/* Otimização: No ambiente real, use next/image. Aqui simulamos o rastro visual. */}
      <img 
        src={mediaUrl} 
        alt={categoryLabel}
        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
      />
      
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black tracking-[0.2em] uppercase shadow-2xl">
          {categoryLabel}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 p-2.5 bg-black/70 backdrop-blur-md rounded-full text-white shadow-xl border border-white/10 group-hover:bg-brand-action group-hover:text-black transition-colors duration-500">
        <MediaIcon size={16} strokeWidth={3} />
      </div>
    </div>
  );
};