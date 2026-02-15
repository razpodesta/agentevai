import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

interface IHeaderProperties {
  readonly title: string;
  readonly isCapturing: boolean;
}

export const LocationHandshakeHeader: React.FC<IHeaderProperties> = ({ title, isCapturing }) => (
  <header className="flex items-center gap-6 mb-10">
    <div className="relative">
      <div className="p-4 bg-brand-action/10 rounded-full text-brand-action shadow-[0_0_30px_rgba(0,229,255,0.15)]">
        <Navigation size={32} className={isCapturing ? 'animate-spin' : ''} />
      </div>
      <div className="absolute -bottom-1 -right-1 p-1.5 bg-brand-primary text-white rounded-full border-2 border-white dark:border-neutral-950">
        <MapPin size={12} />
      </div>
    </div>
    <div>
      <h4 className="font-serif font-black uppercase tracking-[0.2em] text-brand-primary dark:text-white text-xl leading-none">
        {title}
      </h4>
      <p className="text-[10px] font-mono text-brand-action uppercase font-black tracking-widest mt-2">
        IAL3 SOVEREIGN CERTIFICATION
      </p>
    </div>
  </header>
);