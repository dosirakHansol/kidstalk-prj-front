import { CLayout } from "../layouts/CLayout";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "../store/store";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ConfigProvider>
          <CLayout>
            <Component {...pageProps} />
          </CLayout>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}
