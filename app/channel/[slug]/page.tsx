import { supabaseServer } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect('/');
  }

  const { data: channel, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', params.slug);

  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('id', params.slug)
    .eq('user_id', userData.user.id);

  const { data } = await supabase
    .from('members')
    .select('*, channels(*), users(display_name)')
    .eq('channel_id', params.slug);

  if (!data || !member) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-3 w-full h-full'>
      <div>This is the channel id: {data[0].id}</div>
      <div>This is the channel name: {data[0].channels?.name}</div>
      <div>
        This is when the channel was created:{' '}
        {formatDate(data[0].channels?.created_at!)}
      </div>
      <div>These are the members:</div>
      <div className='max-w-md rounded bg-neutral-600 p-4 text-white'>
        {data?.map((member, i) => (
          <p key={i}> - {member.users?.display_name}</p>
        ))}
      </div>
    </div>
  );
}
