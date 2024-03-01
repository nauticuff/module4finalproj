// import { supabaseBrowser } from '@/lib/supabase/client';
import { supabaseServer } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from('channels')
    .select('*')
    .eq('id', params.slug);

   console.log(data) 

  if (!data) {
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
