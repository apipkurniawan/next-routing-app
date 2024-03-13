import Head from "next/head";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";
import Provider from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      {/* <Provider session={pageProps.session}> */}
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.10, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
      {/* </Provider> */}
    </NotificationContextProvider>
  );
}

export default MyApp;
