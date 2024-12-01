import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IChildren } from '../../entities/models/IChildren.ts';
import {FC, useState} from 'react';

export default function QueryProviders({ children }: FC<IChildren>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchInterval: false,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}