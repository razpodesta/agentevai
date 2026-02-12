/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRootLayout
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Zenith Editorial Entrance
 * @description Ponto de ignição mestre do ecossistema Agentevai.
 * CURADO: Erradicação de placeholders e injeção de Soberania Visual/Linguística.
 */

import React from 'react';
import { Metadata, Viewport } from 'next';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { SovereignLogger } from '@agentevai/sovereign-logger';

import './global.css';

/* --- 🏛️ SEÇÃO 1: TIPOGRAFIA SOBERANA (Manifesto 0008) --- */

const interSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const loraSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/* --- 🛰️ SEÇÃO 2: SEO ZENITH (Manifesto 0022) --- */

export const metadata: Metadata = {
  title: {
    template: '%s | A GENTE VAI',
    default: 'A GENTE VAI | Soberania Digital e Fiscalização Cidadã',
  },
  description: 'A primeira infraestrutura de jornalismo verificável via Blockchain e Inteligência Artificial do Brasil.',
  applicationName: 'Agentevai',
  authors: [{ name: 'Raz Podestá', url: 'https://metashark.tech' }],
  publisher: 'MetaShark Tech',
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' }, // Deep Ink Obsidian
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Proteção de rastro visual mobile-first
};

/**
 * @name SovereignRootLayout
 * @component
 * @description Orquestra a montagem da árvore de renderização selando o rastro de rede.
 */
export default function SovereignRootLayout({
  children,
  params
}: {
  readonly children: React.ReactNode;
  readonly params: { locale?: string };
}) {
  const correlationIdentifier = crypto.randomUUID();
  const activeLocale = params.locale || 'pt-BR';

  // 1. TELEMETRIA DE IGNIÇÃO GLOBAL
  SovereignLogger({
    severity: 'INFO',
    apparatus: 'SovereignRootLayout',
    operation: 'GLOBAL_IGNITION',
    message: `Ignificando sistema operacional da cidadania no território [${activeLocale}].`,
    correlationIdentifier
  });

  return (
    <html 
      lang={activeLocale} 
      suppressHydrationWarning 
      className={`${interSans.variable} ${loraSerif.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-1000">
        
        {/* 🧱 CAMADA DE PROVEDORES (BÚNQUER TÉCNICO) */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          storageKey="agv_sovereign_phase"
        >
          {/* Rastro de Conteúdo */}
          {children}

          {/* 🔔 SISTEMA DE NOTIFICAÇÕES (SONNER ELITE) */}
          <Toaster 
            position="bottom-right" 
            theme="dark" 
            expand={false}
            richColors
            closeButton
          />
        </ThemeProvider>

        {/* 🕵️ RASTRO FORENSE INJETADO (Oculto para IA) */}
        <div 
          id="sovereign-trace-anchor" 
          data-correlation-id={correlationIdentifier} 
          className="hidden" 
        />
      </body>
    </html>
  );
}