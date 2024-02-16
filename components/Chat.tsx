'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/lib/supabase/client';
import { toast } from 'sonner';
import MessageTextarea from './MessageTextarea';
import { v4 as uuidv4 } from 'uuid';
import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';

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
  const addMessage = useMessage((state) => state.addMessage)
  const blankMessage = message.trim();

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (blankMessage === '') {
      return;
    }

    const newMessage = {
      id: uuidv4(),
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

    addMessage(newMessage as IMessage)

    e.currentTarget.blur()
    const { error } = await supabase.from('messages').insert({ text: message });
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

  if (!userData) return <p>Login to see chat</p>;
  return (
    <>
      {children}
      <div className='fixed inset-x-0 bottom-0 border-t bg-background sm:border-t-0 sm:px-4 sm:pb-4 md:px-0'>
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
