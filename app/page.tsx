import Header from '@/components/Header';
import Chat from '@/components/Chat';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import ServerMessageList from '@/components/ServerMessageList';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = supabaseServer(cookieStore);
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className='flex min-h-screen flex-col bg-background'>
        <Header user={data.user} />
        <div className='flex h-full flex-1 flex-col'>
          <main className='relative mx-auto mb-32 mt-10 w-full max-w-xl flex-1 px-5 sm:px-1'>
            <Chat userData={data.user}>
              <ServerMessageList />
            </Chat>
          </main>
        </div>
      </div>
      <InitUser user={data.user} />
    </>
  );
}
