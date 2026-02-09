/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletter
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - Kinetic Conversion
 * @description Aparato de captura de e-mails com feedback tátil e auditoria integrada.
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailCheck, Send, ShieldAlert, Loader2 } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

// ADN local
import { SovereignNewsletterInputSchema, type ISovereignNewsletterInput } from './schemas/SovereignNewsletter.schema.js';

export const SovereignNewsletter: React.FC<ISovereignNewsletterInput> = (properties) => {
  const apparatusName = 'SovereignNewsletter';
  const [emailAddress, setEmailAddress] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');

  // 1. ADUANA DE ADN (Garante integridade e fixa o rastro forense)
  const data = useMemo(() => {
    const result = SovereignNewsletterInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-9001'),
        i18nMappingKey: 'INVALID_NEWSLETTER_PROPERTIES',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: apparatusName,
          version: '2.1.0',
          fileLocation: 'libs/realms/marketing-ui/src/lib/sovereign-newsletter/SovereignNewsletter.tsx'
        },
        runtimeSnapshot: { 
          inputPayload: properties, // FIX: Nivelado com o contrato mestre
          correlationIdentifier: properties.correlationIdentifier, 
          validationIssues: result.error.issues 
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'MARKETING_RENDER_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Zero-Any Policy)
  const t = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      properties.dictionary as unknown as ISovereignDictionary, 
      apparatusName,
      key,
      variables,
      data.correlationIdentifier
    );
  }, [properties.dictionary, data.correlationIdentifier]);

  // 3. Handler de Subscrição (Com Resiliência)
  const handleSubmission = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'LOADING' || status === 'SUCCESS') return;

    setStatus('LOADING');

    try {
      await data.onSubscribeIntent(emailAddress);
      setStatus('SUCCESS');

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'CONVERSION_SUCCESS',
        message: 'Lead institucional capturado e selado no Vault.',
        traceIdentifier: data.correlationIdentifier
      });

    } catch (error) {
      setStatus('ERROR');
      SovereignLogger({
        severity: 'ERROR',
        apparatus: apparatusName,
        operation: 'CONVERSION_FAILURE',
        message: 'Falha ao processar vontade do cidadão.',
        traceIdentifier: data.correlationIdentifier
      });
    }
  }, [emailAddress, status, data]);

  return (
    <section className="w-full py-28 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-white/5 transition-colors duration-1000">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
        
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-serif font-black text-brand-primary dark:text-white leading-[0.95] tracking-tighter"
          >
            {t('mainTitle')} <br /> 
            <span className="text-brand-action italic font-medium">{t('actionSuffix')}</span>
          </motion.h2>
          <p className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 font-sans max-w-lg leading-relaxed">
            {t('bodyText')}
          </p>
        </div>

        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {status === 'SUCCESS' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 border-2 border-brand-action bg-brand-action/5 rounded-sm text-center"
              >
                <MailCheck size={64} className="mx-auto text-brand-action mb-6 animate-pulse" />
                <h3 className="font-serif font-black text-2xl text-brand-primary dark:text-white uppercase tracking-widest">{t('successTitle')}</h3>
                <p className="text-neutral-500 mt-4">{t('successMessage')}</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmission}
                className="flex flex-col gap-5"
              >
                <div className="group relative">
                  <input
                    required
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder={t('inputPlaceholder')}
                    className="w-full px-8 py-6 bg-white dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm font-mono text-sm focus:ring-2 focus:ring-brand-action outline-none transition-all shadow-sm"
                  />
                  <Send className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-brand-action transition-colors" size={20} />
                </div>

                <button 
                  disabled={status === 'LOADING'}
                  className="relative overflow-hidden w-full py-6 bg-brand-primary dark:bg-white text-white dark:text-black font-serif font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  {status === 'LOADING' ? <Loader2 className="mx-auto animate-spin" size={20} /> : t('submitLabel')}
                </button>

                {status === 'ERROR' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-mono text-[10px] uppercase text-center tracking-widest flex items-center justify-center gap-2">
                    <ShieldAlert size={12} /> Falha na sincronia. Tente novamente.
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