/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQueryProvider
 * @version 6.5.2
 * @protocol OEDP-V6.5 - High Performance Synchronization
 * @description Central de sincronia de dados. CURADO: Nomenclatura de ADN unificada.
 */

'use client';

import React, { useMemo, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import { QueryCacheConfigurationSchema } from './schemas/SovereignQueryProvider.schema.js';

interface ISovereignQueryProviderProperties {
  readonly children: React.ReactNode;
  readonly correlationIdentifier: string;
}

export const SovereignQueryProvider: React.FC<ISovereignQueryProviderProperties> = ({
  children,
  correlationIdentifier
}) => {
  const apparatusName = 'SovereignQueryProvider';

  const configuration = useMemo(() => QueryCacheConfigurationSchema.parse({}), []);

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
        key: configuration.persistenceKey,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: configuration.garbageCollectionTimeInMilliseconds,
      });

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'OFFLINE_BUNKER_IGNITED',
        message: 'Búnquer de sincronia offline estabilizado.',
        correlationIdentifier
      });
    } catch (caughtError) {
      const diagnostic = SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-CORE-5001'),
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-context/src/lib/SovereignQueryProvider.tsx',
        correlationIdentifier,
        severity: 'MEDIUM'
      });
      SovereignLogger({
        severity: 'WARN',
        apparatus: apparatusName,
        operation: 'PERSISTENCE_DEGRADATION',
        message: diagnostic.message,
        correlationIdentifier,
        metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
      });
    }
  }, [queryClient, configuration, correlationIdentifier]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};