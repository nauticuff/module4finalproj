import { Suspense } from 'react';

import InitMessages from '@/lib/store/InitMessages';
import { supabaseServer } from '@/lib/supabase/server';

import ClientMessageList from './ClientMessageList';
import { MESSAGE_LIMIT } from '@/lib/constant';
import LoadMoreMessages from './LoadMoreMessages';

export default async function ServerMessageList() {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('messages')
    .select('*, users(*)')
    .order('created_at', { ascending: false });
  return (
    <Suspense fallback={'Loading...'}>
      <ClientMessageList />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
}
