'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();

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
    router.refresh();
  };

  return (
    <header className='h-15 sticky left-0 top-0 z-40 gap-4 border-b border-neutral-800 bg-background px-5 py-3'>
      <div className='flex justify-between items-center mx-auto max-w-xl'>
        <h1 className='text-gray-100'>
          Supa<span className='font-bold text-primary'>Chat</span>
        </h1>
        {user ? (
          <Button
            variant='secondary'
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </div>
    </header>
  );
}
