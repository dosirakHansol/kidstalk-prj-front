import { CLayout } from "../layouts/CLayout";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CLayout>
        <Component {...pageProps} />
      </CLayout>
    </QueryClientProvider>
  );
}
