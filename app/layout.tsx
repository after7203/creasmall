"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./globals.css";
import Head from "next/head";
//import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "/api/products",
    cache: new InMemoryCache(),
  });
  return (
    <html lang="en">
      <Head>
        <title>크리스몰</title>
      </Head>
      <body className="w-100vw flex flex-col whitespace-nowrap items-center">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
