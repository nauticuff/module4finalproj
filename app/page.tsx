import Chat from '@/components/Chat';
import Header from '@/components/Header';
import ServerMessageList from '@/components/ServerMessageList';
import InitMessages from '@/lib/store/InitMessages';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  // const { data: messageData } = await supabase.from('messages').select('*, users(*)');

  return (
    <>
      <div className='flex min-h-screen flex-col bg-neutral-900'>
        <Header user={data.user} />
        <div className='flex h-full flex-1 flex-col'>
          <main className='flex flex-col relative mx-auto mb-32 mt-10 w-full max-w-xl flex-1'>
            <Chat userData={data.user}>
              <ServerMessageList />
            </Chat>
          </main>
        </div>
      </div>
      <InitUser user={data.user} />
      {/* <InitMessages messages={messageData || []} /> */}
    </>
  );
}
