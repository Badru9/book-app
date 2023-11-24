"use client";

import { Provider } from "./context/Context";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Provider>{children}</Provider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
