'use client';

import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';

import Message from './Message';
import { DeleteAlert, EditAlert } from './MessageDialogues';
import MessageOptions from './MessageOptions';
import { useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ClientMessageList() {
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();
  
  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {

            const { data, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', payload.new.sent_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage as IMessage);
            }
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <>
      {messages.map((message, idx) => (
        <div key={idx} className='group'>
          <Message message={message}>
            {/* confirm message is user's message */}
            {message.users?.id === user?.id && (
              <MessageOptions message={message} />
            )}
          </Message>
          {idx !== messages.length - 1 && <hr className='my-4 px-2' />}
        </div>
      ))}
      <DeleteAlert />
      <EditAlert />
    </>
  );
}
