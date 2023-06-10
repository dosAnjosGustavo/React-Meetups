import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
