'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { toast } from 'sonner';

import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';

import Message from './Message';
import MessageOptions from './MessageOptions';
import { DeleteAlert, EditAlert } from './MessageDialogues';

export default function ClientMessageList() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className='relative flex-1 overflow-y-auto overflow-x-hidden max-w-3xl mx-auto p-3'
    >
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
    </div>
  );
}
