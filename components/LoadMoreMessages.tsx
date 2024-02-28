'use client';

import { supabaseBrowser } from '@/lib/supabase/client';
import { Button } from './ui/button';
import { MESSAGE_LIMIT } from '@/lib/constant';
import { getFromAndTo } from '@/lib/utils';
import { useMessage } from '@/lib/store/messages';
import { toast } from 'sonner';
import { useUser } from '@/lib/store/user';

export default function LoadMoreMessages() {
  const page = useMessage((state) => state.page);
  const setMessages = useMessage((state) => state.setMessages);
  const user = useUser((state) => state.user)
  const hasMoreMessages = useMessage((state) => state.hasMoreMessages);

  const handleFetchMore = async () => {
    const { from, to } = getFromAndTo(page, MESSAGE_LIMIT);
    const supabase = supabaseBrowser();
    const { data, error } = await supabase
      .from('messages')
      .select('*, users(*)')
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data.reverse());
    }
  };

  if (hasMoreMessages && user) {
    return (
      <Button
        onClick={handleFetchMore}
        className='mb-5 w-full'
        variant='outline'
      >
        Load more
      </Button>
    );
  } 
  return <></>;
}
