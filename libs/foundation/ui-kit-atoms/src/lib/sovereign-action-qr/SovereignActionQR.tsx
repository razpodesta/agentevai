/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignActionQR
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Visual Authority
 * @description Ponte O2O de alta fidelidade. Gera Quick Response Codes 
 * com estilização geométrica e selagem de marca central.
 * @policy ZERO-ANY: Saneamento total via ADN nominal.
 */

'use client';

import React, { useEffect, useRef, useMemo, memo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section ADN de Elite */
import { 
  SovereignActionQRInputSchema, 
  type ISovereignActionQRInput 
} from './schemas/SovereignActionQR.schema.js';

const SovereignActionQRComponent: React.FC<ISovereignActionQRInput> = (properties) => {
  const apparatusName = 'SovereignActionQR';
  const canvasReference = useRef<HTMLDivElement>(null);

  // 1. ADUANA DE ADN (Saneamento Zod V4)
  const validatedData = useMemo(() => SovereignActionQRInputSchema.parse(properties), [properties]);
  
  const { 
    targetUrl, 
    dimensionSize, 
    appearance, 
    dictionary, 
    correlationIdentifier 
  } = validatedData;

  // 2. ORQUESTRAÇÃO DO MOTOR DE ESTILIZAÇÃO (Elite Customization)
  const qrCodeEngine = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return new QRCodeStyling({
      width: dimensionSize,
      height: dimensionSize,
      type: 'svg',
      data: targetUrl,
      image: appearance.logoResourceUrl,
      dotsOptions: {
        color: appearance.foregroundSovereignColor,
        type: 'extra-rounded' // Estética moderna de elite
      },
      backgroundOptions: {
        color: appearance.backgroundSovereignColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
        imageSize: 0.4
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: appearance.foregroundSovereignColor
      },
      cornersDotOptions: {
        type: 'dot',
        color: appearance.foregroundSovereignColor
      }
    });
  }, [targetUrl, dimensionSize, appearance]);

  // 3. IGNIÇÃO VISUAL E TELEMETRIA
  useEffect(() => {
    if (qrCodeEngine && canvasReference.current) {
      canvasReference.current.innerHTML = '';
      qrCodeEngine.append(canvasReference.current);

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'QUICK_RESPONSE_SEALED',
        message: `Rastro O2O gerado com sucesso para o destino: ${targetUrl}`,
        correlationIdentifier: correlationIdentifier
      });
    }
  }, [qrCodeEngine, targetUrl, correlationIdentifier]);

  // 4. RESOLUÇÃO SEMÂNTICA
  const accessibilityInstruction = SovereignTranslationEngine.translate(
    dictionary as unknown as ISovereignDictionary,
    apparatusName,
    'accessibilityInstruction',
    {},
    correlationIdentifier
  );

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-white/10 shadow-2xl group transition-all duration-1000">
      <div 
        ref={canvasReference} 
        className="p-4 bg-white rounded-xs shadow-inner ring-1 ring-neutral-100 transition-transform duration-700 group-hover:scale-[1.02]" 
      />
      
      <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-neutral-400 group-hover:text-brand-action transition-all duration-500">
          {accessibilityInstruction}
        </span>
        <div className="h-0.5 w-16 bg-brand-action/20 rounded-full group-hover:w-24 group-hover:bg-brand-action transition-all duration-700" />
      </div>
    </div>
  );
};

export const SovereignActionQR = memo(SovereignActionQRComponent);