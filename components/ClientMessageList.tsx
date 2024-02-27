'use client';

import { ArrowDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';

import Message from './Message';
import { DeleteAlert, EditAlert } from './MessageDialogues';
import MessageOptions from './MessageOptions';
import { Button } from './ui/button';

export default function ClientMessageList() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScrolled, setUserScrolled] = useState(false);
  const [notification, setNotification] = useState(0);
  const { messages, addMessage, optimisticIds, deleteMessage, editMessage } =
    useMessage((state) => state);

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
          const scrollContainer = scrollRef.current;
          const didScroll =
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
            //add a check 
            //if message sent is also not the one currently logged in
            const latestMessage = messages[messages.length - 1]
          if (didScroll && (latestMessage.sent_by !== user?.id)) {
            setNotification((current) => current + 1);
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          deleteMessage(payload.old.id);
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages' },
        (payload) => {
          editMessage(payload.new as IMessage);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const didScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(didScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };

  const scrollToBottom = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div
        className='mx-auto w-full max-w-3xl flex-1 overflow-y-auto overflow-x-hidden p-3'
        ref={scrollRef}
        onScroll={handleOnScroll}
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
      {userScrolled && (
        <div className='absolute bottom-28 w-full '>
          {notification && (
            <div className='mb-3 grid w-full place-items-center'>
              <Button
                className='rounded-md border border-border bg-background px-3 py-2 text-neutral-100 transition-all hover:scale-[1.03] hover:bg-primary'
                type='button'
                onClick={scrollToBottom}
              >
                {notification} new messages.
              </Button>
            </div>
          )}
          <Button
            className='mx-auto flex size-12 cursor-pointer items-center justify-center rounded-full border border-border bg-background p-2 transition-all hover:scale-110 hover:bg-primary'
            type='button'
            onClick={scrollToBottom}
            aria-label='scroll to bottom'
          >
            <ArrowDown />
          </Button>
        </div>
      )}
    </>
  );
}
