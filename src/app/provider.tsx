"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Provider({ children }: { children: React.ReactNode }) {
    const client = new QueryClient();
    return (
        <>
            <QueryClientProvider client={client}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
}
