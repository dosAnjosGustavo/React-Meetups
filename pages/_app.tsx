import React from 'react';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
