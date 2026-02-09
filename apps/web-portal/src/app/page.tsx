/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignJournalLayout (Main Page)
 * @version 3.0.0
 * @protocol OEDP-V5.5.1 - Prestige Editorial
 */

import React from 'react';
import { SovereignMainHeader } from '@agentevai/ui-kit-organisms';
import { SovereignNewsletter } from '@agentevai/marketing-ui';
import { PublicComplaintOrganism } from '@agentevai/complaints-ui';
import { AdVantagePreviewUI } from '@agentevai/advertising-ui';

export default function Index() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-700">

      {/* 🏛️ Navegação de Elite */}
      <SovereignMainHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* 📰 Zona de Notícias (Feed Regional) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="mb-4 border-b-4 border-brand-primary pb-2 inline-block">
               <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary dark:text-brand-action">
                 Fatos em Destaque
               </h2>
            </header>

            {/* Injeção de Denúncias Reais */}
            <PublicComplaintOrganism
              severity="CRITICAL"
              title="Crise no Saneamento: Inundação no Centro Histórico"
              description="Moradores relatam negligência sistêmica nas galerias pluviais..."
              locationLabel="Florianópolis, SC"
              merkleRootAnchor="sha256:f1e2d3c4b5a6..."
              {...mockAuthorData}
            />
          </div>

          {/* 📊 Zona de Inteligência e Lab */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
            <section className="p-6 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-sm">
              <h3 className="font-serif font-black text-xl mb-4">Ad-Vantage Lab</h3>
              <p className="text-sm text-neutral-500 mb-6">Área exclusiva para parceiros institucionais.</p>
              <AdVantagePreviewUI />
            </section>
          </aside>
        </div>
      </div>

      {/* 📧 Conversão Final */}
      <SovereignNewsletter />

      {/* 🏁 Footer (Em construção) */}
    </main>
  );
}

const mockAuthorData = {
  author: {
    citizenName: "Raz Podestá",
    identityRole: "PLATFORM_ENGINEER",
    reputationStandingScore: 9500,
    correlationIdentifier: "uuid-v4-..."
  }
};
