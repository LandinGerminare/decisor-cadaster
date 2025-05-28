import { AuthProvider } from "@/context/Auth";
import { msalConfig } from "@/entraid/authConfig";
import "@/styles/globals.css";
import { BoundaryError } from "@/types/ApplicationError";
import { reportApplicationError } from "@/utils/ReportApplicationError";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWindowSize } from "usehooks-ts";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { height, width } = useWindowSize();
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <Head>
        <title>Decisor</title>
      </Head>
      <ErrorBoundary
        fallbackRender={() => appContent()}
        onError={(error, info) => {
          const boundaryError: BoundaryError = {
            type: "BOUNDARY",
            route: {
              path: router.pathname,
              query: router.query,
            },
            stackTrace: info.componentStack || "",
            text: error.message,
            userAgent: navigator.userAgent,
            screen: {
              height: height,
              width: width,
            },
          };
          reportApplicationError(boundaryError);
        }}
      >
        {appContent()}
      </ErrorBoundary>
    </>
  );

  function appContent() {
    return (
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <NextNProgress
            color="var(--primary-500)"
            options={{ showSpinner: false }}
          />
          {["/", "/404"].includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
          <ToastContainer />
        </AuthProvider>
      </MsalProvider>
    );
  }
}
