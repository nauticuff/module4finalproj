'use client';

import { supabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();

  const handleLogin = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className='h-15 sticky left-0 top-0 z-40 flex w-full items-center justify-between gap-4 bg-neutral-900 px-5 py-3'>
      {/* <form className='flex flex-col border-2 p-4 border-gray-700 bg-slate-400 rounded-md'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
        <button className='p-3 rounded border-none bg-blue-700 my-2'>Log in</button>
      </form> */}
      <h1 className='text-gray-100'>
        Supa<span className='font-bold text-primary'>Chat</span>
      </h1>
      {user ? (
        <Button variant='secondary' onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
}
