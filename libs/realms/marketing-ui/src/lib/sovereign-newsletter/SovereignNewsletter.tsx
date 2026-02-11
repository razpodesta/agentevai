/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletter
 * @version 4.2.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description Orquestrador de broadcast regionalizado. 
 * Saneado: Erradicado erro TS4111 via Desestruturação Nominal Imediata.
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MailCheck, ShieldAlert } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Zonas Atômicas */
import { SovereignNewsletterInputSchema, type ISovereignNewsletterInput } from './schemas/SovereignNewsletter.schema.js';
import { NewsletterEditorialZone } from './components/NewsletterEditorialZone.js';
import { NewsletterFormZone } from './components/NewsletterFormZone.js';

export const SovereignNewsletter: React.FC<ISovereignNewsletterInput> = (properties) => {
  const apparatusName = 'SovereignNewsletter';
  const [operationalStatus, setOperationalStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');

  // 1. ADUANA DE ADN (Fixação do Rastro e Cura TS4111)
  const validatedData = useMemo(() => SovereignNewsletterInputSchema.parse(properties), [properties]);
  
  /** 
   * @section CURA_TS4111 
   * Extraímos as propriedades da assinatura de índice para referências nominais estáveis.
   */
  const { 
    onSubscribeIntent, 
    dictionary, 
    correlationIdentifier, 
    titleOverride 
  } = validatedData;

  // 2. RESOLUÇÃO SEMÂNTICA
  const translateLabel = useCallback((semanticKey: string, variables = {}) =>
    SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary, 
      apparatusName, 
      semanticKey, 
      variables, 
      correlationIdentifier
    ), [dictionary, correlationIdentifier]);

  // 3. HANDLER DE BROADCAST AGNÓSTICO
  const handleSubscriptionSubmission = useCallback(async (subscriberEmailAddress: string) => {
    setOperationalStatus('LOADING');
    try {
      // Invocação segura via referência nominal
      await onSubscribeIntent(subscriberEmailAddress);
      setOperationalStatus('SUCCESS');

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'BROADCAST_SUBSCRIPTION_SEALED',
        message: 'Rastro de subscrição selado para distribuição de inteligência.',
        correlationIdentifier: correlationIdentifier
      });
    } catch (caughtError) {
      setOperationalStatus('ERROR');
      throw SovereignError.transmute(caughtError, {
        code: 'OS-APP-9002',
        apparatus: apparatusName,
        location: 'libs/realms/marketing-ui/src/lib/sovereign-newsletter/SovereignNewsletter.tsx',
        correlationIdentifier: correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }, [onSubscribeIntent, correlationIdentifier]);

  return (
    <section className="w-full py-28 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-white/5 transition-colors duration-1000">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">

        <NewsletterEditorialZone
          title={titleOverride || translateLabel('mainTitle')}
          actionSuffix={translateLabel('actionSuffix')}
          bodyText={translateLabel('bodyText')}
        />

        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {operationalStatus === 'SUCCESS' ? (
              <motion.div
                key="success"
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
              <div className="flex flex-col gap-4">
                <NewsletterFormZone
                  placeholder={translateLabel('inputPlaceholder')}
                  submitLabel={translateLabel('submitLabel')}
                  isLoading={operationalStatus === 'LOADING'}
                  onSubscribe={handleSubscriptionSubmission}
                />
                {operationalStatus === 'ERROR' && (
                  <p className="text-red-500 font-mono text-[10px] uppercase text-center tracking-widest flex items-center justify-center gap-2">
                    <ShieldAlert size={12} /> {translateLabel('errorValidation')}
                  </p>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};