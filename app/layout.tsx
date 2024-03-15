import './globals.css';

import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';

import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SupaChat',
  description: 'Chat here, chat there, chat everywhere.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-col sm:flex-row h-screen'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
          storageKey='supachat-theme'
        >
          <Sidebar />
          {children}
          <Toaster richColors position='top-center' />
          {/* This is only to check if there is a user
              on the client side only.
            */}
          <InitUser user={data.user} />
        </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
