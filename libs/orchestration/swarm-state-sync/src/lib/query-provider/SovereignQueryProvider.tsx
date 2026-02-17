/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQueryProvider
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Swarm Synchrony Actuator
 * @description Central de sincronia de dados e persistência offline.
 * CURADO: Sincronizado com Logger V7 e erradicada radiação de nomes legados.
 */

'use client';

import React, { useMemo, useEffect, memo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN Zenith */
import {
  QueryCacheConfigurationSchema
} from './schemas/SovereignQueryProvider.schema.js';

interface ISovereignQueryProviderProperties {
  readonly children: React.ReactNode;
  readonly correlationIdentifier: string;
}

const SovereignQueryProviderComponent: React.FC<ISovereignQueryProviderProperties> = ({
  children,
  correlationIdentifier
}) => {
  const apparatusName = 'SovereignQueryProvider';
  const fileLocation = 'libs/orchestration/swarm-state-sync/src/lib/query-provider/SovereignQueryProvider.tsx';

  // 1. ADUANA DE ADN (Configuração Selada)
  const configuration = useMemo(() => QueryCacheConfigurationSchema.parse({}), []);

  // 2. IGNIÇÃO DO MOTOR DE QUERY (TanStack V5)
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: configuration.staleTimeInMilliseconds,
        gcTime: configuration.garbageCollectionTimeInMilliseconds,
        retry: configuration.retryAttemptsCount,
        networkMode: 'offlineFirst',
      },
      mutations: { networkMode: 'always' }
    },
  }), [configuration]);

  // 3. PERSISTÊNCIA NO BÚNQUER LOCAL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
        key: configuration.persistenceKeyIdentifier,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: configuration.garbageCollectionTimeInMilliseconds,
      });

      SovereignLogger({
        severity: 'INFO',
        apparatusIdentifier: apparatusName,
        operationCode: 'OFFLINE_BUNKER_IGNITED',
        semanticMessage: 'Sincronia volátil do enxame estabilizada no búnquer local.',
        correlationIdentifier
      });

    } catch (caughtError) {
      const diagnostic = SovereignError.transmute(caughtError, {
        code: 'OS-CORE-5001',
        apparatus: apparatusName,
        location: fileLocation,
        correlationIdentifier,
        severity: 'MEDIUM'
      });

      SovereignLogger({
        severity: 'WARN',
        apparatusIdentifier: apparatusName,
        operationCode: 'PERSISTENCE_DEGRADATION',
        semanticMessage: diagnostic.message,
        correlationIdentifier,
        forensicMetadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
      });
    }
  }, [queryClient, configuration, correlationIdentifier]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export const SovereignQueryProvider = memo(SovereignQueryProviderComponent);
