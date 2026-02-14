/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLocationHandshake
 * @version 6.6.0
 * @protocol OEDP-V6.5 - High Performance Implementation
 * @description Orquestrador de hardware para captura de GPS.
 * CURADO: Erradicada radiação técnica e implementada atomização SOLID.
 */

'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Atoms */
import {
  SovereignLocationHandshakeInputSchema,
  HighFidelityLocationSchema,
  type ISovereignLocationHandshakeInput,
  type GeographicCoordinate
} from './schemas/SovereignLocationHandshake.schema.js';
import { LocationHandshakeHeader } from './components/LocationHandshakeHeader.js';

const SovereignLocationHandshakeComponent: React.FC<ISovereignLocationHandshakeInput> = (properties) => {
  const apparatusName = 'SovereignLocationHandshake';
  const fileLocation = 'libs/foundation/ui-kit-atoms/src/lib/sovereign-location-handshake/SovereignLocationHandshake.tsx';

  const [operationalStatus, setOperationalStatus] = useState<'IDLE' | 'CAPTURING' | 'SUCCESS' | 'ERROR'>('IDLE');

  // 1. ADUANA DE ADN (Ingresso Seguro)
  const data = useMemo(() => SovereignLocationHandshakeInputSchema.parse(properties), [properties]);
  const { correlationIdentifier, dictionary, onLocationCaptured } = data;

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    const sovereignDictionary = { metadata: { locale: 'pt-BR', version: '6.6.0' }, content: dictionary } as unknown as ISovereignDictionary;
    return SovereignTranslationEngine.translate(sovereignDictionary, apparatusName, semanticKey, variables, correlationIdentifier);
  }, [dictionary, correlationIdentifier]);

  // 3. HANDLER DE CAPTURA (Cura de Radiação: SovereignError consumido)
  const igniteLocationHandshake = useCallback(async () => {
    if (!navigator.geolocation) {
      setOperationalStatus('ERROR');
      return;
    }

    setOperationalStatus('CAPTURING');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const snapshot = HighFidelityLocationSchema.parse({
            latitude: position.coords.latitude as GeographicCoordinate,
            longitude: position.coords.longitude as GeographicCoordinate,
            accuracyInMeters: position.coords.accuracy,
            altitude: position.coords.altitude,
            capturedAt: new Date().toISOString()
          });

          setOperationalStatus('SUCCESS');
          SovereignLogger({
            severity: 'INFO',
            apparatus: apparatusName,
            operation: 'LOCATION_SEALED',
            message: translate('logHandshakeSuccess'),
            correlationIdentifier
          });
          onLocationCaptured(snapshot);
        } catch (caughtError) {
          setOperationalStatus('ERROR');
          // ✅ CURADO: SovereignError e SovereignErrorCodeSchema consumidos
          throw SovereignError.transmute(caughtError, {
            code: SovereignErrorCodeSchema.parse('OS-VAL-4001'),
            apparatus: apparatusName,
            location: fileLocation, // ✅ CURADO: fileLocation consumido
            correlationIdentifier,
            severity: 'HIGH'
          });
        }
      },
      () => setOperationalStatus('ERROR'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onLocationCaptured, correlationIdentifier, translate]);

  return (
    <div className="w-full max-w-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 rounded-xs p-12 shadow-2xl transition-all duration-1000">
      <LocationHandshakeHeader
        title={translate('mainTitle')}
        isCapturing={operationalStatus === 'CAPTURING'}
      />

      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 font-sans">
          {translate('instructionBody')}
        </p>

        <AnimatePresence mode="wait">
          {operationalStatus === 'IDLE' && (
            <motion.button
              key="idle"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={igniteLocationHandshake}
              className="w-full py-6 bg-brand-primary dark:bg-white text-white dark:text-black font-serif font-black uppercase tracking-[0.4em] text-xs rounded-xs"
            >
              {translate('actionLabel_START')}
            </motion.button>
          )}

          {operationalStatus === 'CAPTURING' && (
            <motion.div key="capturing" className="flex flex-col items-center justify-center gap-4 py-10 border-2 border-dashed border-brand-action/30 rounded-xs bg-brand-action/5">
              <Loader2 className="animate-spin text-brand-action" size={32} />
              <span className="font-mono text-[11px] uppercase font-black text-brand-action tracking-widest">{translate('status_CAPTURING')}</span>
            </motion.div>
          )}

          {operationalStatus === 'SUCCESS' && (
            <motion.div key="success" initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="flex items-center justify-center gap-4 py-6 text-green-500 font-mono text-[11px] uppercase font-black border-2 border-green-500/20 bg-green-500/5 rounded-xs">
              <ShieldCheck size={20} /> {translate('status_SUCCESS')}
            </motion.div>
          )}

          {operationalStatus === 'ERROR' && (
            <motion.div key="error" className="flex flex-col gap-5 text-center">
              <div className="flex items-center justify-center gap-3 py-6 text-red-500 font-mono text-[11px] uppercase font-black border-2 border-red-500/20 bg-red-500/5 rounded-xs">
                <AlertTriangle size={20} /> {translate('status_ERROR')}
              </div>
              <button onClick={igniteLocationHandshake} className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-brand-action underline underline-offset-8 transition-colors">
                {translate('actionLabel_RETRY')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-12 pt-8 border-t border-neutral-100 dark:border-white/5 flex items-center gap-4">
        <ShieldCheck size={18} className="text-brand-action" />
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-tight">
          {translate('securityFootnote')}
        </span>
      </footer>
    </div>
  );
};

export const SovereignLocationHandshake = memo(SovereignLocationHandshakeComponent);
