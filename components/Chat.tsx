'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import MessageTextarea from './MessageTextarea';

export default function Chat({
  userData,
  children,
}: {
  userData: User | null;
  children: React.ReactNode;
}) {
  const supabase = supabaseBrowser();
  const [message, setMessage] = useState<string>('');
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const blankMessage = message.trim();

  const handleSendMessage = async (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (blankMessage === '') {
      return;
    }

    const id = uuidv4();
    const newMessage = {
      id,
      text: message,
      sent_by: user?.id,
      is_edited: false,
      created_at: new Date().toISOString(),
      users: {
        id: user?.id,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
        display_name: user?.user_metadata.user_name,
      },
    };

    addMessage(newMessage as IMessage);
    setOptimisticIds(newMessage.id);

    //Message kept getting displayed twice in Chat => Message because I forgot the id in { text: message, id }
    const { error } = await supabase.from('messages').insert({ text: message, id });
    if (error) {
      toast.error(error.message);
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!userData)
    return (
      <h1 className='grid flex-1 animate-pulse place-items-center text-lg font-semibold'>
        Login to see chat
      </h1>
    );

  return (
    <>
      {children}
      <div className='fixed inset-x-0 bottom-0 border-t bg-neutral-900 sm:border-t-0 sm:px-4 sm:pb-4 md:px-0'>
        <MessageTextarea
          props={{
            blankMessage,
            message,
            setMessage,
            handleKeyPress,
            handleSendMessage,
          }}
        />
      </div>
    </>
  );
}
