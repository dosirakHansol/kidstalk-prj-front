import { CLayout } from "../layouts/CLayout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CLayout>
      <Component {...pageProps} />
    </CLayout>
  );
}
