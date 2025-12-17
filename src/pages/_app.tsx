// Global Styles
import "@template/styles/globals.scss";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";

// React / Next
import { useEffect, useState, Suspense } from "react";
import type { AppProps } from "next/app";

// Libraries
import i18n from "@template/lib/i18n";
import { I18nextProvider } from "react-i18next";

// Context Providers
import { LanguageProvider } from "@template/context/LanguageContext";
import { ThemeProvider } from "@template/context/ThemeContext";
import { NetworkProvider } from "@template/context/NetworkProvider";
import { AuthProvider } from "@template/context/AuthContext";
import { ToastProvider } from "@template/context/ToastContext";
import { PermissionProvider } from "@template/context/PermissionContext";
import { LayoutProvider } from "@template/context/LayoutProvider";
import { ModalProvider } from "@template/context/ModalProvider";
import { ErrorBoundary } from "@template/context/ErrorBoundary";

// Hooks
import { useNavigation } from "@template/hooks/useNavigation";

// Common / Utils
import { preFetchPath } from "@template/common/preFetch";

// Components
import { Toaster } from "sonner";
import { RouteLoaderProvider } from "@/context/RouteLoaderProvider";
import { GlobalLoader } from "@/component/GlobalLoader";

export default function App({ Component, pageProps }: AppProps) {
  const { preFetch } = useNavigation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    preFetchPath.forEach((path) => preFetch(path));
  }, [preFetch]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function SlowData() {
    await new Promise((res) => setTimeout(res, 3000));
    return <div>Data Loaded!</div>;
  }

  if (!isMounted) return null;

  return (
    <RouteLoaderProvider>
      <ErrorBoundary>
        <Toaster position="bottom-right" richColors closeButton />
        <NetworkProvider>
          <ThemeProvider>
            <I18nextProvider i18n={i18n}>
              <LanguageProvider>
                <PermissionProvider>
                  <ToastProvider>
                    <AuthProvider>
                      <LayoutProvider>
                        <ModalProvider>
                          <Suspense fallback={<GlobalLoader />}>
                            <Component {...pageProps} />
                          </Suspense>
                        </ModalProvider>
                      </LayoutProvider>
                    </AuthProvider>
                  </ToastProvider>
                </PermissionProvider>
              </LanguageProvider>
            </I18nextProvider>
          </ThemeProvider>
        </NetworkProvider>
      </ErrorBoundary>
    </RouteLoaderProvider>
  );
}
