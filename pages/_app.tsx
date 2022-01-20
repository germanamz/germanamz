import '../styles/globals.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';

import Gtm from '../components/Gtm';
import RootStoreProvider from '../components/RootStoreProvider';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
      <Gtm />
      <Head>
        <title>Germanamz</title>
      </Head>
      <RootStoreProvider>
        <Component {...pageProps} />
      </RootStoreProvider>
    </>
  )

export default MyApp;
