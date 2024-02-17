import { Suspense } from 'react';

import InitMessages from '@/lib/store/InitMessages';
import { supabaseServer } from '@/lib/supabase/server';

import ClientMessageList from './ClientMessageList';

export default async function ServerMessageList() {
  const supabase = supabaseServer();
  const { data } = await supabase.from('messages').select('*, users(*)');
  return (
    
    <div>
      <Suspense fallback={'Loading...'}>
        <ClientMessageList />
        <InitMessages messages={data || []} />
      </Suspense>
    </div>
  );
}
