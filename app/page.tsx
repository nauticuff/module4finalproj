import Chat from '@/components/Chat';
import ServerMessageList from '@/components/ServerMessageList';
import InitMembers from '@/lib/store/InitMembers';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  const { data: memberData } = await supabase
    .from('members')
    .select('*, channels(*)')
    .eq('user_id', data.user?.id!);

    // console.log(memberData)
  return (
    <Chat>
      <ServerMessageList />
      <InitMembers members={memberData || []} />
    </Chat>
  );
}
