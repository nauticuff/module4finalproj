'use client'

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { User } from "@supabase/supabase-js"

export default function Header({ user }: { user: User | null }) {

  
  const handleLogin = () => {
    
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  }

  const handleLogout = () => {
    const supabase = createClient();
    supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className='h-15 bg-green-200 flex justify-end gap-4 items-center'>
      {/* <form className='flex flex-col border-2 p-4 border-gray-700 bg-slate-400 rounded-md'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
        <button className='p-3 rounded border-none bg-blue-700 my-2'>Log in</button>
      </form> */}
      {user ? (
        <Button onClick={handleLogout}>Log out</Button>
      ) : (
        <Button onClick={handleLogin}>Login with GitHub</Button>
      )}
    </div>
  )
}