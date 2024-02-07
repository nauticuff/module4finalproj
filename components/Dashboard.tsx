'use client';

import type { AuthError, User } from '@supabase/supabase-js';
import Link from 'next/link';

interface DahboardProps {
  user: User | null;
  error: AuthError | null;
}
export default async function Dashboard({ user, error }: DahboardProps) {
  if (error || !user)
    return (
      <section className='p-3'>
        <p className='mb-2'>You are not logged in. </p>
        <p className='text-3xl'>
          Go to
          <Link className='bg-orange-500' href={'/login'}>login</Link>
        </p>
      </section>
    );

  return <div className='p-3'>Welcome back, {user?.email}</div>;
}
