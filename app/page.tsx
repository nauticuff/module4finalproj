import Chat from "@/components/Chat";
import Dashboard from '@/components/Dashboard'
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  return (
    <main>
      <Chat />
      <Dashboard user={data.user} error={error}/>
      <p>Hello world</p>
    </main>
  );
}
