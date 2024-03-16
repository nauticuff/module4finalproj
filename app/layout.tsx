import './globals.css';

import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';

import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import { DeleteAlert, EditAlert } from '@/components/MessageDialogues';
import { DeleteChannelAlert } from '@/components/ChannelDialogues';
import { NewChannelDialog } from '@/components/NewChannelDialog';
import InitMembers from '@/lib/store/InitMembers';
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

  const { data: memberData } = await supabase
    .from('members')
    .select('*, channels(*)')
    .eq('user_id', data.user?.id!);

  return (
    <html lang='en'>
      <body className={`${inter.className} h-screen`}>
        <div className='flex h-full flex-col sm:flex-row'>
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
            <InitMembers members={memberData || []} />
            <DeleteAlert />
            <EditAlert />
            <DeleteChannelAlert />
            <NewChannelDialog />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
