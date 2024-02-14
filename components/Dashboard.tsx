'use client';

import type { User } from '@supabase/supabase-js';

export default async function Dashboard({ user}: { user: User | null}) {

  return (
    <>
      {user ? (
        <p>Welcome back, {user.email}</p>
      ) : (
        <p>No dashboard info here.</p>
      )}
    </>
  )
}
