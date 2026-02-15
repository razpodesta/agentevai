/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignQueryProvider
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Performance Persistence
 * @description Orquestrador saneado com integração de Erro Soberano e rastro forense.
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

import { QueryCacheConfigurationSchema } from './schemas/SovereignQuery.schema.js';

interface IQueryProviderProperties {
  readonly children: React.ReactNode;
  readonly correlationIdentifier: string;
}

export const SovereignQueryProvider: React.FC<IQueryProviderProperties> = ({
  children,
  correlationIdentifier
}) => {
  const apparatusName = 'SovereignQueryProvider';

  // 1. ADUANA DE CONFIGURAÇÃO (ADN Check)
  const configuration = useMemo(() => QueryCacheConfigurationSchema.parse({}), []);

  // 2. IGNIÇÃO DO CLIENTE MESTRE
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: configuration.staleTimeInMilliseconds,
        gcTime: configuration.garbageCollectionTimeInMilliseconds,
        retry: configuration.retryAttempts,
        networkMode: 'offlineFirst',
      },
      mutations: {
        networkMode: 'always', // As mutações devem sempre tentar selagem
      }
    },
  }), [configuration]);

  // 3. PERSISTÊNCIA SOBERANA (Búnquer Local)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storagePersister = createSyncStoragePersister({
        storage: window.localStorage,
        key: configuration.persistenceKey,
      });

      persistQueryClient({
        queryClient,
        persister: storagePersister,
        maxAge: configuration.garbageCollectionTimeInMilliseconds,
      });

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'PERSISTENCE_SEALED',
        message: 'Búnquer de cache offline operando com integridade nominal.',
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
        operation: 'PERSISTENCE_DEGRADED',
        message: diagnostic.message,
        correlationIdentifier
      });
    }
  }, [queryClient, configuration, correlationIdentifier]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
