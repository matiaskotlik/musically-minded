import type { Metadata } from 'next';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import QueryProvider from '@/providers/query-provider';

export const metadata: Metadata = {
  title: {
    default: 'Musically Minded',
    template: '%s | Musically Minded',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex min-h-dvh flex-col antialiased'>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
