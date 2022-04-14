import '../styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from  '@fortawesome/fontawesome-svg-core';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Gtm from '../components/Gtm';
import wrapper from '../store';

config.autoAddCss = false;

const MyApp = wrapper.withRedux(({ Component, pageProps }: AppProps) => (
  <>
    <Gtm />
    <Head>
      <title>Portfolio: German Meza</title>
    </Head>
    <Component {...pageProps} />
  </>
));

export default MyApp;
