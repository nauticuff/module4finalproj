'use client'

import { createClient } from "@/lib/supabase/client"


export default function LoginPage() {

  const supabase = createClient()
  const handleLogin = async () => {

    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })

  }

  return (
    <div className='h-screen bg-yellow-200 flex justify-center gap-4 items-center'>
      <form className='flex flex-col border-2 p-4 border-gray-700 bg-slate-400 rounded-md'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
        <button className='p-3 rounded border-none bg-blue-700 my-2'>Log in</button>
      </form>
        <button className='p-3 rounded border-none bg-blue-700' onClick={handleLogin}>Login with GitHub</button>
    </div>
  )
}