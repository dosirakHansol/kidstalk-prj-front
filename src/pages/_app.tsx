import { CLayout } from "../layouts/CLayout";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CLayout>
      <Component {...pageProps} />
    </CLayout>
  );
}
