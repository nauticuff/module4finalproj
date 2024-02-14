import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Dashboard from '@/components/Dashboard';
import InitUser from '@/lib/store/InitUser';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-2xl px-4 relative h-full">
        <InitUser user={data.user} />
        <Header user={data.user} />
        <Chat userData={data.user} />
        <Dashboard user={data.user} />
        <p>Hello world</p>
      </main>
    </div>
  );
}
