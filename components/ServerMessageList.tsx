import React, { Suspense } from 'react';
import ClientMessageList from './ClientMessageList';
import { supabaseServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import InitMessages from '@/lib/store/InitMessages';

export default async function ServerMessageList() {
  
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  // await new Promise(resolve => setTimeout(resolve, 5000));
  const { data } = await supabase.from('messages').select('*, users(*)');
  console.log(data);

  return (
    <div>
      <Suspense fallback={'Loading...'}>
        <ClientMessageList />
        <InitMessages messages={data || []} />
      </Suspense>
    </div>
  );
}
