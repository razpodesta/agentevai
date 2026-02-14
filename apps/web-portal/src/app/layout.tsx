/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRootLayout
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Ponto de ignição mestre. CURADO: Unificação de rastro forense e Mirroring Interno.
 */

import React from 'react';
import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';

import './global.css';

/** @section Sincronia de ADN Internal Mirror (.js obrigatório para ESM) */
import { SovereignRootLayoutInputSchema } from './schemas/SovereignRootLayout.schema.js';

/* --- 🏛️ TIPOGRAFIA SOBERANA (Manifesto 0008) --- */

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fontSerif = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

/* --- 🛰️ SEO ZENITH (Manifesto 0022) --- */

export const metadata: Metadata = {
  metadataBase: new URL('https://agentevai.com.br'),
  title: {
    template: '%s | A GENTE VAI',
    default: 'A GENTE VAI | Soberania Digital',
  },
  description: 'Infraestrutura de jornalismo verificável via Blockchain e Inteligência Artificial.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * @name SovereignRootLayout
 * @component (React Server Component)
 */
export default async function SovereignRootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const startTimestamp = performance.now();

  /**
   * @section Rastro Forense Unificado
   * Recuperação do identificador gerado pelo SovereignMiddleware.
   */
  const requestHeaders = await headers();
  const correlationIdentifier = requestHeaders.get('x-agv-correlation-id') || crypto.randomUUID();

  try {
    // 1. ADUANA DE ADN (Selagem de Infraestrutura)
    SovereignRootLayoutInputSchema.parse({
      children,
      correlationIdentifier,
      dictionary: {} // Injetado dinamicamente via Segment Layouts
    });

    const endTimestamp = performance.now();
    const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 2. TELEMETRIA DE IGNIÇÃO GLOBAL
    SovereignLogger({
      severity: 'INFO',
      apparatus: 'SovereignRootLayout',
      operation: 'GLOBAL_STABILIZATION_SUCCESS',
      message: `Búnquer operacional estabilizado em ${ignitionLatency}ms.`,
      correlationIdentifier
    });

    return (
      <html
        suppressHydrationWarning
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <body className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-1000">

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            storageKey="agv_sovereign_phase"
          >
            {/* 📍 Rastro de Segmentos Culturais */}
            {children}

            <Toaster
              position="bottom-right"
              theme="dark"
              expand={false}
              richColors
            />
          </ThemeProvider>

          {/* 🕵️ Rastro Forense Injetado para Auditoria Neural Externa */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__AGV_TRACE__ = { correlationId: "${correlationIdentifier}" };`,
            }}
          />
        </body>
      </html>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-CORE-0002'),
      apparatus: 'SovereignRootLayout',
      location: 'apps/web-portal/src/app/layout.tsx',
      correlationIdentifier,
      severity: 'FATAL',
      recoverySuggestion: 'Falha crítica na estabilização do rastro global. Verifique a malha de tipos e o rastro de rede do Middleware.'
    });
  }
}
