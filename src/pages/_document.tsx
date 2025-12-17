import i18n from "@template/lib/i18n";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={i18n.language}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
