/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSection
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Performance RSC
 * @description Orquestrador de layout adaptativo para o enxame de notícias.
 */

import React, { useMemo } from 'react';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

// ADN e Componentes Atômicos
import { SovereignSectionInputSchema, type ISovereignSectionInput } from './schemas/SovereignSection.schema.js';
import { SectionHeader } from './components/SectionHeader.js';

export const SovereignSection: React.FC<ISovereignSectionInput> = (properties) => {
  const apparatusName = 'SovereignSection';

  // 1. ADUANA DE ADN (Cura do Erro TS2353 e Saneamento de Tipos)
  const data = useMemo(() => {
    const result = SovereignSectionInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-7003'),
        i18nMappingKey: 'INVALID_SECTION_PROPERTIES',
        severity: 'MEDIUM',
        apparatusMetadata: { name: apparatusName, version: '2.1.0', fileLocation: 'libs/realms/news-ui/...' },
        runtimeSnapshot: { inputPayload: properties, correlationIdentifier: properties.correlationIdentifier },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'SECTION_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. MAPEAMENTO DE GEOMETRIA (Visual Intelligence)
  const gridClasses = {
    NATIONAL_ZENITH: "grid-cols-1",
    REGIONAL_PULSE: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    INVESTIGATIVE_VAULT: "grid-cols-1 lg:grid-cols-12 gap-12",
    COMMUNITY_THREAD: "flex flex-col gap-4"
  }[data.semanticIntent];

  // 3. RESOLUÇÃO SEMÂNTICA DO TÍTULO
  const resolvedTitle = useMemo(() => {
    // Se o título for uma chave de tradução, resolve. Senão, usa o texto bruto.
    if (data.sectionTitle.startsWith('intent_')) {
        return SovereignTranslationEngine.translate(
          data.dictionary as unknown as ISovereignDictionary,
          apparatusName,
          data.sectionTitle,
          {},
          data.correlationIdentifier
        );
    }
    return data.sectionTitle;
  }, [data.sectionTitle, data.dictionary, data.correlationIdentifier]);

  return (
    <section className="w-full py-12 border-b border-neutral-100 dark:border-white/5 last:border-0 transition-colors duration-500">
      
      {/* Cabeçalho Atômico */}
      <SectionHeader title={resolvedTitle} hierarchy={data.visualHierarchy} />

      {/* Malha de Conteúdo (Injeção de Children) */}
      <div className={`grid gap-10 ${gridClasses}`}>
        {data.children}
      </div>

    </section>
  );
};