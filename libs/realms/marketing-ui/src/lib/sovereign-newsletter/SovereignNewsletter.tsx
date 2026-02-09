/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletter
 * @version 2.2.0
 * @protocol OEDP-V5.5.2 - Kinetic Conversion & Forensic Integrity
 * @description Aparato de captura de rastro institucional. 
 * Implementa feedback tátil, resiliência de erro e soberania linguística.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 * @policy ZERO-ANY: Erradicação total de tipagem anárquica.
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailCheck, Send, ShieldAlert, Loader2 } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

// ADN local e Definição de Contrato
import { 
  SovereignNewsletterInputSchema, 
  type ISovereignNewsletterInput 
} from './schemas/SovereignNewsletter.schema.js';

/**
 * @name SovereignNewsletter
 * @component
 * @description Ponto de ignição para engajamento via e-mail. 
 * Sela a vontade do cidadão no Vault institucional.
 */
export const SovereignNewsletter: React.FC<ISovereignNewsletterInput> = (properties) => {
  const apparatusName = 'SovereignNewsletter';
  const fileLocation = 'libs/realms/marketing-ui/src/lib/sovereign-newsletter/SovereignNewsletter.tsx';

  const [subscriberEmailAddress, setSubscriberEmailAddress] = useState('');
  const [operationalStatus, setOperationalStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');

  // 1. ADUANA DE ADN (Garante integridade estrutural e rastro de jornada)
  const validatedData = useMemo(() => {
    const result = SovereignNewsletterInputSchema.safeParse(properties);
    
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-9001'),
        i18nMappingKey: 'INVALID_NEWSLETTER_PROPERTIES',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: apparatusName,
          version: '2.2.0',
          fileLocation
        },
        runtimeSnapshot: { 
          inputPayload: properties, // Sincronia com Manifesto 0010
          correlationIdentifier: properties.correlationIdentifier, 
          validationIssues: result.error.issues 
        },
        forensicTrace: { 
          timestamp: new Date().toISOString(), 
          stack: new Error().stack || 'UI_RENDER_ADUANA' 
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Tradução via Engine Soberana)
  // Erradicada a abreviação 't' para 'translateLabel'
  const translateLabel = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      validatedData.dictionary as unknown as ISovereignDictionary, 
      apparatusName,
      semanticKey,
      variables,
      validatedData.correlationIdentifier
    );
  }, [validatedData.dictionary, validatedData.correlationIdentifier]);

  // 3. HANDLER DE SUBSCOÇÃO (Orquestração de Vontade)
  const handleSubscriptionSubmission = useCallback(async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (operationalStatus === 'LOADING' || operationalStatus === 'SUCCESS') return;

    setOperationalStatus('LOADING');

    try {
      await validatedData.onSubscribeIntent(subscriberEmailAddress);
      setOperationalStatus('SUCCESS');

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'CONVERSION_SUCCESS',
        message: 'Rastro de e-mail selado no cofre institucional.',
        traceIdentifier: validatedData.correlationIdentifier,
        metadata: { status: 'SUBSCRIBED' }
      });

    } catch (caughtError) {
      setOperationalStatus('ERROR');
      
      // Cura do erro 'unused vars' e emissão de rastro forense real
      const diagnostic = SovereignError.transmute(caughtError, {
        code: 'OS-APP-9002',
        apparatus: apparatusName,
        location: fileLocation,
        correlationIdentifier: validatedData.correlationIdentifier,
        severity: 'HIGH'
      });

      SovereignLogger({
        severity: 'ERROR',
        apparatus: apparatusName,
        operation: 'CONVERSION_FAILURE',
        message: diagnostic.message,
        traceIdentifier: validatedData.correlationIdentifier,
        metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
      });
    }
  }, [subscriberEmailAddress, operationalStatus, validatedData]);

  return (
    <section className="w-full py-28 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-white/5 transition-colors duration-1000">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
        
        {/* Lado A: Impacto Editorial */}
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-serif font-black text-brand-primary dark:text-white leading-[0.95] tracking-tighter"
          >
            {translateLabel('mainTitle')} <br /> 
            <span className="text-brand-action italic font-medium">
              {translateLabel('actionSuffix')}
            </span>
          </motion.h2>
          <p className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 font-sans max-w-lg leading-relaxed">
            {translateLabel('bodyText')}
          </p>
        </div>

        {/* Lado B: Atuador de Captura */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {operationalStatus === 'SUCCESS' ? (
              <motion.div 
                key="success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 border-2 border-brand-action bg-brand-action/5 rounded-sm text-center"
              >
                <MailCheck size={64} className="mx-auto text-brand-action mb-6 animate-pulse" />
                <h3 className="font-serif font-black text-2xl text-brand-primary dark:text-white uppercase tracking-widest">
                  {translateLabel('successTitle')}
                </h3>
                <p className="text-neutral-500 mt-4">{translateLabel('successMessage')}</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form_active"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubscriptionSubmission}
                className="flex flex-col gap-5"
              >
                <div className="group relative">
                  <input
                    required
                    type="email"
                    value={subscriberEmailAddress}
                    onChange={(inputEvent) => setSubscriberEmailAddress(inputEvent.target.value)}
                    placeholder={translateLabel('inputPlaceholder')}
                    className="w-full px-8 py-6 bg-white dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm font-mono text-sm focus:ring-2 focus:ring-brand-action outline-none transition-all shadow-sm"
                  />
                  <Send 
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-brand-action transition-colors" 
                    size={20} 
                  />
                </div>

                <button 
                  disabled={operationalStatus === 'LOADING'}
                  className="relative overflow-hidden w-full py-6 bg-brand-primary dark:bg-white text-white dark:text-black font-serif font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer disabled:cursor-wait"
                >
                  {operationalStatus === 'LOADING' ? (
                    <Loader2 className="mx-auto animate-spin" size={20} />
                  ) : (
                    translateLabel('submitLabel')
                  )}
                </button>

                {operationalStatus === 'ERROR' && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-500 font-mono text-[10px] uppercase text-center tracking-widest flex items-center justify-center gap-2"
                  >
                    <ShieldAlert size={12} /> Sincronia de rastro falhou. Tente novamente.
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};