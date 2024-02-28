import Header from '@/components/Header';
import ServerMessageList from '@/components/ServerMessageList';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <div className='h-screen bg-neutral-900'>
      <div className='relative flex h-full flex-col'>
        <Header user={data.user} />
        <main className='flex flex-1 flex-col overflow-y-auto'>
          <ServerMessageList />
        </main>
      </div>
      <InitUser user={data.user} />
    </div>
  );
}
