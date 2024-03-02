import { supabaseServer } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = supabaseServer();

  const { data: userData } = await supabase.auth.getUser();
  if(!userData.user){
    redirect('/')
  }

  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', params.slug);

  if (error) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-3'>
      <div>This is the channel id: {data[0].id}</div>
      <div>This is the channel name: {data[0].name}</div>
      <div>
        This is when the channel was created: {formatDate(data[0].created_at)}
      </div>
    </div>
  );
}
