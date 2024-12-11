import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { type ReactNode } from 'react';

/**
 * Sets up the QueryClientProvider from @tanstack/react-query.
 * @desc See: https://tanstack.com/query/v4/docs/react/overview
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
