'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import ChatPresence from './ChatPresence';
import { useUser } from '@/lib/store/user';

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();
  const resetUser = useUser((state) => state.resetUser);

  const handleLogin = () => {
    const supabase = supabaseBrowser();
    try {
      supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      router.push('/');
      toast.error('Error logging in. Please try again.');
    }
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();

    resetUser();

    router.refresh();
  };

  return (
    <header className='flex items-center justify-between gap-4 border-b border-neutral-800 bg-background px-5 py-3 lg:px-8 2xl:px-[10%]'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-gray-100'>
          Supa<span className='font-bold text-primary'>Chat</span>
        </h1>
        <ChatPresence />
      </div>
      {user ? (
        <Button
          className='py-0 md:py-4'
          variant='secondary'
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button className='py-2 md:py-4' onClick={handleLogin}>
          Login
        </Button>
      )}
    </header>
  );
}
